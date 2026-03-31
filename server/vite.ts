import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { getSeoRedirect, normalizeSeoPath, renderSeoHtml } from "./seo";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    const pathname = normalizeSeoPath(req.path);

    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    const redirectTarget = getSeoRedirect(pathname);
    if (redirectTarget) {
      const suffix = url.includes("?") ? url.slice(url.indexOf("?")) : "";
      res.redirect(301, `${redirectTarget}${suffix}`);
      return;
    }

    if (path.extname(pathname)) {
      next();
      return;
    }

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const { html, page } = renderSeoHtml(template, pathname);
      const transformedPage = await vite.transformIndexHtml(url, html);
      const status = page.path === "/not-found" ? 404 : 200;
      res.status(status).set({ "Content-Type": "text/html" }).end(transformedPage);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
