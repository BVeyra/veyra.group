#!/bin/bash
# Veyra SEO push — SIMPLIFIED (2026-07-07).
# The SEO commit (15f27b1: the new AI-tools blog post + title fixes) is ALREADY made locally.
# This just pushes it. No rebase, no stash, so your uncommitted WIP
# (veyra-logo.svg, package-lock.json, server/seo.ts) is NOT touched and NOT pushed.

cd "$(cd -- "$(dirname -- "$0")/.." && pwd)" || exit 1
rm -f .git/index.lock

echo "== Making sure the SEO files are committed (idempotent) =="
git add \
  client/src/content/resources.ts \
  client/public/sitemap.xml \
  client/src/App.tsx \
  client/src/pages/AIPropertyManagementToolsPage.tsx
if ! git diff --cached --quiet; then
  git commit -m "seo: add blog post — 9 Best AI Property Management Tools for Independent Operators (2026)"
else
  echo "(already committed as 15f27b1 — good)"
fi

echo ""
echo "== Unpushed commits =="
git log --oneline origin/main..HEAD

echo ""
echo "== Pushing to origin/main (triggers Vercel) — your WIP stays local =="
if git push origin main; then
  echo ""
  echo "==================================================="
  echo "  DONE — pushed. Vercel is rebuilding now."
  echo "==================================================="
else
  echo ""
  echo "!! Push was rejected (origin may have moved). Nothing lost — tell Claude to sync."
fi

echo ""
echo "Press any key to close."
read -n 1
