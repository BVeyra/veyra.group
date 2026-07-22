#!/bin/bash
# Veyra SEO push. Builds and validates generated SEO artifacts before staging
# the explicitly listed website files. It never removes Git locks, stashes, or
# stages unrelated worktree files.

cd "$(cd -- "$(dirname -- "$0")/.." && pwd)" || exit 1

echo "== Type-checking and validating generated SEO artifacts =="
npm run check || exit 1
npm run build || exit 1
npm run check:seo || exit 1

echo "== Staging the approved SEO files only =="
git add \
  client/src/content/resources.ts \
  client/src/components/ResourceArticlePage.tsx \
  server/seo.ts \
  package.json \
  scripts/push-veyra.command
if ! git diff --cached --quiet; then
  git commit -m "seo: add validated optimization loop"
else
  echo "(no approved SEO changes to commit)"
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
