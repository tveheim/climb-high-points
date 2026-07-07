#!/bin/bash
# Installer fswatch
if ! command -v fswatch &>/dev/null; then
  brew install fswatch
fi

# Lag watch-skript
cat > ~/VM-Tipping/autopush.sh << 'WATCHSCRIPT'
#!/bin/bash
REPO="$HOME/VM-Tipping"
FILE="$REPO/src/routes/index.tsx"

echo "[autopush] Watching $FILE for changes..."

clear_stale_locks() {
  find "$REPO/.git" -name "*.lock" -mmin +5 -print -delete 2>/dev/null
}

fswatch -o "$FILE" | while read; do
  sleep 1
  cd "$REPO"
  clear_stale_locks
  if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
    echo "[autopush] No changes detected."
    continue
  fi
  DATO=$(date +%Y-%m-%d)
  git add -A
  git commit -m "Update standings $DATO (auto)"
  git push origin main
  echo "[autopush] Pushed at $(date)"
done
WATCHSCRIPT

chmod +x ~/VM-Tipping/autopush.sh

# Lag launchd plist
mkdir -p ~/Library/LaunchAgents
cat > ~/Library/LaunchAgents/no.veheim.vmtipping.autopush.plist << 'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>no.veheim.vmtipping.autopush</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/thomasveheim/VM-Tipping/autopush.sh</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>/tmp/vmtipping-autopush.log</string>
  <key>StandardErrorPath</key>
  <string>/tmp/vmtipping-autopush.log</string>
</dict>
</plist>
PLIST

# Last inn launchd agent
launchctl unload ~/Library/LaunchAgents/no.veheim.vmtipping.autopush.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/no.veheim.vmtipping.autopush.plist

echo "✅ Auto-push daemon er installert og køyrer."
echo "Logg: tail -f /tmp/vmtipping-autopush.log"
