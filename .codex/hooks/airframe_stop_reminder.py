#!/usr/bin/env python3
import os
import sys


def main() -> int:
    if not os.path.exists("AGENTS.md"):
        return 0

    print(
        "Airframe stop checklist: mention verification run/skipped, graph update status, and any MEMORY.md/work-log update needed.",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
