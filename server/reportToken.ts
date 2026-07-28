import crypto from "node:crypto";
import type { AuditLeadData } from "../shared/auditEngine.js";
import { normalizeLeadPayload } from "../shared/auditValidation.js";

const TOKEN_VERSION = "v1";
const DEFAULT_TTL_SECONDS = 7 * 24 * 60 * 60;
const MAX_TTL_SECONDS = 30 * 24 * 60 * 60;

type ReportTokenPayload = { v: 1; exp: number; data: AuditLeadData };

function reportTokenKey(env: NodeJS.ProcessEnv): Buffer {
  const encoded = env.REPORT_TOKEN_ENCRYPTION_KEY?.trim();
  if (!encoded || !/^[A-Za-z0-9_-]+$/.test(encoded)) throw new Error("REPORT_TOKEN_ENCRYPTION_KEY must be a base64url-encoded 32-byte key.");
  const key = Buffer.from(encoded, "base64url");
  if (key.length !== 32) throw new Error("REPORT_TOKEN_ENCRYPTION_KEY must be a base64url-encoded 32-byte key.");
  return key;
}

function tokenTtlSeconds(env: NodeJS.ProcessEnv): number {
  const value = env.REPORT_TOKEN_TTL_SECONDS?.trim() || String(DEFAULT_TTL_SECONDS);
  if (!/^\d+$/.test(value)) throw new Error("REPORT_TOKEN_TTL_SECONDS must be a positive integer.");
  const ttl = Number(value);
  if (ttl < 60 || ttl > MAX_TTL_SECONDS) throw new Error("REPORT_TOKEN_TTL_SECONDS must be between 60 seconds and 30 days.");
  return ttl;
}

/** Encrypts report data so browser history, logs, and referrers never carry PII. */
export function issueReportToken(data: AuditLeadData, env: NodeJS.ProcessEnv = process.env, now = new Date()): string {
  const plaintext = Buffer.from(JSON.stringify({
    v: 1,
    exp: Math.floor(now.getTime() / 1000) + tokenTtlSeconds(env),
    data,
  } satisfies ReportTokenPayload));
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", reportTokenKey(env), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return [TOKEN_VERSION, iv.toString("base64url"), encrypted.toString("base64url"), cipher.getAuthTag().toString("base64url")].join(".");
}

/** Returns only validated, unexpired report data; every malformed token fails closed. */
export function openReportToken(token: string, env: NodeJS.ProcessEnv = process.env, now = new Date()): AuditLeadData | null {
  try {
    const [version, encodedIv, encodedCiphertext, encodedTag, ...rest] = token.split(".");
    if (version !== TOKEN_VERSION || rest.length || !encodedIv || !encodedCiphertext || !encodedTag) return null;
    const decipher = crypto.createDecipheriv("aes-256-gcm", reportTokenKey(env), Buffer.from(encodedIv, "base64url"));
    decipher.setAuthTag(Buffer.from(encodedTag, "base64url"));
    const parsed = JSON.parse(Buffer.concat([decipher.update(Buffer.from(encodedCiphertext, "base64url")), decipher.final()]).toString("utf8")) as ReportTokenPayload;
    if (parsed.v !== 1 || !Number.isInteger(parsed.exp) || parsed.exp < Math.floor(now.getTime() / 1000)) return null;
    return normalizeLeadPayload(parsed.data as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}
