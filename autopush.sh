#!/bin/bash
# autopush.sh — polls git status every 10s and commits/pushes any uncommitted changes
REPO="$HOME/VM-Tipping"
LOG="/tmp/vmtipping-autopush.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"
}

clear_stale_locks() {
  find "$REPO/.git" -name "*.lock" -mmin +5 -print 2>/dev/null | while read -r f; do
    log "Removing stale lock (>5min old): $f"
    rm -f "$f"
  done
}

log "autopush started (PID $$)"
cd "$REPO" || { log "ERROR: cannot cd to $REPO"; exit 1; }

while true; do
  clear_stale_locks
  STATUS=$(git status --porcelain 2>&1)
  if [ -n "$STATUS" ]; then
    log "Change detected: $STATUS"
    git add -A
    COMMIT_OUT=$(git commit -m "Auto: update standings $(date +%Y-%m-%d)" 2>&1)
    log "Commit: $COMMIT_OUT"
    PUSH_OUT=$(git push origin main 2>&1)
    log "Push: $PUSH_OUT"
  fi
  sleep 10
done
