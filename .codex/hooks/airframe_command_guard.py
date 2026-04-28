#!/usr/bin/env python3
import json
import re
import sys


BLOCKED_PATTERNS = [
    (r"\bgit\s+reset\s+--hard\b", "git reset --hard is blocked for Airframe unless the user explicitly requests destructive reset."),
    (r"\bgit\s+checkout\s+--\b", "git checkout -- is blocked because it can discard user changes."),
    (r"\bgit\s+clean\s+-[^\n;]*[fdx]", "git clean with force/delete flags is blocked because it can remove untracked user work."),
    (r"\brm\s+-[^\n;]*r[^\n;]*f[^\n;]*(\.codex|\.code-review-graph|src|tests|\.github|package-lock\.json|package\.json)\b", "recursive forced deletion of project-critical paths is blocked."),
    (r"\b(cat|sed|awk|grep|rg)\b[^\n;]*(\.env|\.env\.[A-Za-z0-9_.-]+)\b", "reading .env files is blocked to avoid exposing secrets."),
]


def extract_command(payload: dict) -> str:
    tool_input = payload.get("tool_input") or {}
    if isinstance(tool_input, dict):
        return str(tool_input.get("cmd") or tool_input.get("command") or "")
    return ""


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        return 0

    command = extract_command(payload)
    if not command:
        return 0

    for pattern, message in BLOCKED_PATTERNS:
        if re.search(pattern, command):
            print(message, file=sys.stderr)
            return 2

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
