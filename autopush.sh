#!/bin/bash
# autopush.sh — polls git status every 10s and pushes any changes to index.tsx
REPO="$HOME/VM-Tipping"
LOG="/tmp/vmtipping-autopush.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"
}

log "autopush started (PID $$)"
cd "$REPO" || { log "ERROR: cannot cd to $REPO"; exit 1; }

while true; do
  STATUS=$(git status --porcelain src/routes/index.tsx 2>&1)
  if [ -n "$STATUS" ]; then
    log "Change detected: $STATUS"
    git add src/routes/index.tsx
    COMMIT_OUT=$(git commit -m "Auto: update standings $(date +%Y-%m-%d)" 2>&1)
    log "Commit: $COMMIT_OUT"
    PUSH_OUT=$(git push origin main 2>&1)
    log "Push: $PUSH_OUT"
  fi
  sleep 10
done
