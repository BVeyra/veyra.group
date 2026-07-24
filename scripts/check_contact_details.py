#!/usr/bin/env python3
"""Block stale Veyra contact details before publishing or handing off work."""

from __future__ import annotations

import sys
import zipfile
from pathlib import Path

from pypdf import PdfReader


WORKSPACE = Path(__file__).resolve().parents[3]
CHECKER = Path(__file__).resolve()
OLD_NUMBERS = (
    "302-600-2625",
    "(302) 600-2625",
    "+1-302-600-2625",
    "3026002625",
)
EXCLUDED_PATH_TOKENS = (
    ".git",
    "node_modules",
    "dist",
    "_review_and_delete",
    "archive",
    "atlas",
    "personal",
)
TEXT_SUFFIXES = {
    ".css",
    ".csv",
    ".html",
    ".js",
    ".json",
    ".jsx",
    ".md",
    ".mjs",
    ".py",
    ".sh",
    ".svg",
    ".toml",
    ".ts",
    ".tsx",
    ".txt",
    ".xml",
    ".yaml",
    ".yml",
}
OFFICE_SUFFIXES = {".docx", ".ods", ".odt", ".pptx", ".xlsm", ".xlsx"}
REQUIRED_VALUES = {
    WORKSPACE / "02_website/live_site/client/src/pages/home.tsx": ("+1-220-244-4213",),
    WORKSPACE / "02_website/live_site/server/seo.ts": ("+1-220-244-4213",),
    WORKSPACE / "_agents/scripts/pdf/create_business_cards.py": ("(220) 244-4213", "(920) 282-2580"),
}


def is_excluded(path: Path) -> bool:
    return any(token in part.casefold() for part in path.parts for token in EXCLUDED_PATH_TOKENS)


def extract_content(path: Path) -> str | None:
    suffix = path.suffix.casefold()
    if suffix in TEXT_SUFFIXES:
        return path.read_text(encoding="utf-8", errors="ignore")
    if suffix == ".pdf":
        return "\n".join(page.extract_text() or "" for page in PdfReader(str(path)).pages)
    if suffix in OFFICE_SUFFIXES:
        with zipfile.ZipFile(path) as archive:
            return "\n".join(
                archive.read(name).decode("utf-8", "ignore")
                for name in archive.namelist()
                if name.endswith((".xml", ".rels"))
            )
    return None


def main() -> int:
    failures: list[str] = []
    for path in WORKSPACE.rglob("*"):
        if not path.is_file() or path.resolve() == CHECKER or is_excluded(path):
            continue
        try:
            content = extract_content(path)
        except Exception as error:
            failures.append(f"Could not inspect {path.relative_to(WORKSPACE)}: {error}")
            continue
        if content and any(number in content for number in OLD_NUMBERS):
            failures.append(f"Old Veyra phone number found in {path.relative_to(WORKSPACE)}")

    for path, expected_values in REQUIRED_VALUES.items():
        try:
            content = path.read_text(encoding="utf-8")
            for expected_value in expected_values:
                if expected_value not in content:
                    failures.append(
                        f"Required contact value {expected_value!r} is missing from "
                        f"{path.relative_to(WORKSPACE)}"
                    )
        except OSError as error:
            failures.append(f"Could not verify {path.relative_to(WORKSPACE)}: {error}")

    if failures:
        print("Contact-details check failed:", *failures, sep="\n- ", file=sys.stderr)
        return 1

    print("Contact-details check passed: no old number variants found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
