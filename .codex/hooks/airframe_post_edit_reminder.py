#!/usr/bin/env python3
import json
import os
import sys
from typing import Any


UI_PATHS = (
    "src/app/",
    "src/features/",
    "src/shared/ui/",
    "src/index.css",
    "tailwind.config",
    "vite.config",
    "package.json",
    "package-lock.json",
)

CONTENT_PATHS = (
    "src/content/",
    "src/features/curriculum/",
)


def collect_paths(value: Any) -> set[str]:
    paths: set[str] = set()
    if isinstance(value, dict):
        for key, item in value.items():
            if key in {"file_path", "path"} and isinstance(item, str):
                paths.add(item)
            else:
                paths.update(collect_paths(item))
    elif isinstance(value, list):
        for item in value:
            paths.update(collect_paths(item))
    return paths


def normalize(path: str) -> str:
    cwd = os.getcwd()
    if os.path.isabs(path):
        try:
            return os.path.relpath(path, cwd)
        except ValueError:
            return path
    return path


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        return 0

    paths = {normalize(path) for path in collect_paths(payload.get("tool_input") or payload)}
    if not paths:
        return 0

    messages: list[str] = []
    if any(path.startswith(UI_PATHS) or path in UI_PATHS for path in paths):
        messages.append("Airframe verification reminder: run npm run lint and npm run build before final response; use browser/responsive QA for layout changes.")

    if any(path.startswith(CONTENT_PATHS) for path in paths):
        messages.append("Airframe content reminder: validate Arista terminology, wireless/campus realism, and lesson/lab/quiz consistency.")

    if os.path.isdir(".code-review-graph"):
        messages.append("Graph reminder: after meaningful source edits, run code-review-graph update --repo '/Users/theorajan/local builds/airframe'.")

    if messages:
        print("\n".join(dict.fromkeys(messages)), file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
