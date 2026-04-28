#!/usr/bin/env python3
import os
import sys


def exists(path: str) -> bool:
    return os.path.exists(os.path.join(os.getcwd(), path))


def main() -> int:
    if not exists("AGENTS.md"):
        return 0

    lines = [
        "Airframe context: use code-review-graph before broad source scans; read CONTEXT.md/MEMORY.md when task scope needs project orientation.",
        "Default verification after UI/runtime edits: npm run lint, then npm run build.",
    ]

    if exists(".code-review-graph"):
        lines.append("Graph is present: prefer code-review-graph status/search/impact before rg over src/**.")

    if exists("src/content"):
        lines.append("Content changes should preserve Arista terminology and realistic enterprise wireless/campus examples.")

    print("\n".join(lines), file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
