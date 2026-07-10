import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
app.set("trust proxy", "loopback");

app.use(express.json());

const defaultCorsOrigins = [
  "https://veyragroup.ai",
  "https://www.veyragroup.ai",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOriginValues = (process.env.CORS_ORIGINS || defaultCorsOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsAllowedOrigins = new Set<string>();
const corsAllowedHosts = new Set<string>();

for (const value of corsOriginValues) {
  if (value === "*") {
    corsAllowedOrigins.add("*");
    continue;
  }

  const hasProtocol = /^https?:\/\//i.test(value);
  if (hasProtocol) {
    try {
      corsAllowedOrigins.add(new URL(value).origin);
    } catch {
      // Ignore malformed entries.
    }
    continue;
  }

  // Support host-only values like "veyra-group.vercel.app" in env config.
  const normalizedHost = value
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
  if (normalizedHost) {
    corsAllowedHosts.add(normalizedHost);
  }
}

app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) {
        return callback(null, true);
      }

      // Local dev servers get assigned arbitrary ports; loopback origins are
      // only trusted outside production.
      if (
        process.env.NODE_ENV !== "production" &&
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
      ) {
        return callback(null, true);
      }

      if (corsAllowedOrigins.size === 0 && corsAllowedHosts.size === 0) {
        return callback(null, true);
      }

      if (corsAllowedOrigins.has("*")) {
        return callback(null, true);
      }

      let requestOrigin = origin;
      let requestHost = "";
      try {
        const parsed = new URL(origin);
        requestOrigin = parsed.origin;
        requestHost = parsed.host.toLowerCase();
      } catch {
        // Leave requestOrigin as-is when parsing fails.
      }

      if (
        corsAllowedOrigins.has(requestOrigin) ||
        (requestHost && corsAllowedHosts.has(requestHost))
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    console.error(err);
    res.status(status).json({ message: "Internal server error" });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
