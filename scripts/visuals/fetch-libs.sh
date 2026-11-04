#!/usr/bin/env bash
# Clone the two CC0 illustration sources at pinned commits (outside the repo).
# Usage: bash scripts/visuals/fetch-libs.sh   -> prints the library directory.
set -euo pipefail
DIR="${VISUAL_LIBS:-/tmp/saipan-visual-libs}"
mkdir -p "$DIR"
fetch(){ # repo commit name
  if [ ! -d "$DIR/$3/.git" ]; then git clone -q --depth 50 "https://github.com/$1" "$DIR/$3"; fi
  git -C "$DIR/$3" fetch -q --depth 50 origin "$2" 2>/dev/null || true
  git -C "$DIR/$3" checkout -q "$2"
}
# Open Peeps parts (artwork CC0 by Pablo Stanley; repackaged by Jens Horstmann, MIT)
fetch jenshor/open-peeps 816c04b7d09ac23a76c9260c7a8c818057696b9a open-peeps
# Health Icons (icons CC0 1.0, Resolve to Save Lives)
fetch resolvetosavelives/healthicons 8e8eca6b95821101bac1fde69531d8baffa68fbe healthicons
echo "$DIR"
