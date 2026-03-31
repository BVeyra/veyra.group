import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { getSeoRedirect } from "./seo";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    const redirectTarget = getSeoRedirect(req.path);
    if (!redirectTarget) {
      next();
      return;
    }

    const suffix = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    res.redirect(301, `${redirectTarget}${suffix}`);
  });

  app.use(
    express.static(distPath, {
      extensions: ["html"],
      redirect: false,
    }),
  );

  app.use("*", (req, res) => {
    const notFoundPath = path.resolve(distPath, "404.html");

    if (path.extname(req.path)) {
      res.status(404).end();
      return;
    }

    res.status(404).sendFile(notFoundPath);
  });
}
