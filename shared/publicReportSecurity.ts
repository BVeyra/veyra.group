import crypto from "node:crypto";

type HeaderValue = string | string[] | undefined;
type HeaderMap = Record<string, HeaderValue>;

type AbuseControlResult = "allowed" | "rate_limited" | "spend_cap_reached" | "unavailable";

const DEFAULT_IP_LIMIT = 5;
const DEFAULT_IP_WINDOW_SECONDS = 60 * 60;
const DEFAULT_DAILY_SEND_CAP = 50;

function requiredPositiveInteger(value: string | undefined, fallback: number, name: string): number {
  const candidate = value?.trim() || String(fallback);
  if (!/^\d+$/.test(candidate) || Number(candidate) < 1 || Number(candidate) > 1_000_000) {
    throw new Error(`${name} must be a positive integer no greater than 1000000.`);
  }
  return Number(candidate);
}

function stringHeader(headers: HeaderMap, name: string): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  const first = Array.isArray(value) ? value[0] : value;
  return first?.trim() || undefined;
}

/** Vercel injects this header; never fall back to caller-supplied X-Forwarded-For. */
export function verifiedClientIp(headers: HeaderMap, socketAddress?: string): string {
  return stringHeader(headers, "x-vercel-forwarded-for") || socketAddress || "unknown";
}

export async function verifyPublicReportTurnstile(
  token: unknown,
  clientIp: string,
  env: NodeJS.ProcessEnv = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret || typeof token !== "string" || !token.trim()) return false;
  try {
    const response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: clientIp }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    // A verifier outage must not turn a paid public route into an open relay.
    return false;
  }
}

function utcDay(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function secondsUntilNextUtcDay(now: Date): number {
  const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(1, Math.ceil((next - now.getTime()) / 1000) + 300);
}

function hashedIp(clientIp: string): string {
  return crypto.createHash("sha256").update(clientIp).digest("hex");
}

/**
 * Atomically reserves a bounded number of units. The counter never decrements:
 * a failed email attempt remains charged, which prevents retries from evading
 * the spend ceiling.
 */
const RESERVE_SCRIPT = [
  "local current = tonumber(redis.call('GET', KEYS[1]) or '0')",
  "local requested = tonumber(ARGV[1])",
  "local maximum = tonumber(ARGV[2])",
  "if current + requested > maximum then return {0, current} end",
  "local updated = redis.call('INCRBY', KEYS[1], requested)",
  "if updated == requested then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[3])) end",
  "return {1, updated}",
].join("\n");

export class PublicReportAbuseControls {
  private readonly redisUrl: string;
  private readonly redisToken: string;
  private readonly ipLimit: number;
  private readonly ipWindowSeconds: number;
  private readonly dailySendCap: number;

  constructor(env: NodeJS.ProcessEnv = process.env, private readonly fetchImpl: typeof fetch = fetch) {
    this.redisUrl = env.UPSTASH_REDIS_REST_URL?.trim() || "";
    this.redisToken = env.UPSTASH_REDIS_REST_TOKEN?.trim() || "";
    this.ipLimit = requiredPositiveInteger(env.PUBLIC_REPORT_IP_MAX_REQUESTS, DEFAULT_IP_LIMIT, "PUBLIC_REPORT_IP_MAX_REQUESTS");
    this.ipWindowSeconds = requiredPositiveInteger(env.PUBLIC_REPORT_IP_WINDOW_SECONDS, DEFAULT_IP_WINDOW_SECONDS, "PUBLIC_REPORT_IP_WINDOW_SECONDS");
    this.dailySendCap = requiredPositiveInteger(env.PUBLIC_REPORT_DAILY_SEND_CAP, DEFAULT_DAILY_SEND_CAP, "PUBLIC_REPORT_DAILY_SEND_CAP");
  }

  async reserve(clientIp: string, sendAttempts: number, now = new Date()): Promise<AbuseControlResult> {
    if (!Number.isInteger(sendAttempts) || sendAttempts < 1) return "unavailable";
    if (!this.redisUrl || !this.redisToken) return "unavailable";
    const rateKey = `veyra:public-report:ip:${hashedIp(clientIp)}:${Math.floor(now.getTime() / (this.ipWindowSeconds * 1000))}`;
    if (!(await this.reserveCounter(rateKey, 1, this.ipLimit, this.ipWindowSeconds))) return "rate_limited";
    const dailyKey = `veyra:public-report:send-attempts:${utcDay(now)}`;
    if (!(await this.reserveCounter(dailyKey, sendAttempts, this.dailySendCap, secondsUntilNextUtcDay(now)))) return "spend_cap_reached";
    return "allowed";
  }

  private async reserveCounter(key: string, amount: number, maximum: number, ttlSeconds: number): Promise<boolean | undefined> {
    let endpoint: URL;
    try {
      // Upstash accepts a complete Redis command as a JSON array at the REST
      // endpoint root. Do not append `/eval`: that form expects individual
      // URL command arguments instead of the complete command array below.
      endpoint = new URL("/", this.redisUrl);
      if (endpoint.protocol !== "https:") return undefined;
    } catch {
      return undefined;
    }
    try {
      const response = await this.fetchImpl(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${this.redisToken}`, "Content-Type": "application/json" },
        body: JSON.stringify([RESERVE_SCRIPT, 1, key, amount, maximum, ttlSeconds]),
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) return undefined;
      const body = (await response.json()) as { result?: unknown };
      return Array.isArray(body.result) && body.result[0] === 1;
    } catch {
      return undefined;
    }
  }
}
