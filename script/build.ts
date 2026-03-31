import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { mkdir, readFile, rm, writeFile } from "fs/promises";
import path from "path";
import {
  buildRobotsTxt,
  buildSitemapXml,
  getRenderableSeoPaths,
  renderSeoHtml,
} from "../server/seo";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("generating seo pages...");
  const distPath = path.resolve("dist", "public");
  const baseTemplate = await readFile(path.join(distPath, "index.html"), "utf-8");

  for (const routePath of getRenderableSeoPaths()) {
    const { html } = renderSeoHtml(baseTemplate, routePath);
    const outputPath =
      routePath === "/"
        ? path.join(distPath, "index.html")
        : path.join(distPath, `${routePath.slice(1)}.html`);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf-8");
  }

  const { html: notFoundHtml } = renderSeoHtml(baseTemplate, "/not-found");
  await writeFile(path.join(distPath, "404.html"), notFoundHtml, "utf-8");
  await writeFile(path.join(distPath, "not-found.html"), notFoundHtml, "utf-8");

  await writeFile(path.join(distPath, "robots.txt"), buildRobotsTxt(), "utf-8");
  await writeFile(path.join(distPath, "sitemap.xml"), buildSitemapXml(), "utf-8");

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
