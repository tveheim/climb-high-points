#!/bin/bash
# setup_daemon.sh — eitt-steg oppsett av autopush LaunchAgent
# Køyr: bash ~/VM-Tipping/setup_daemon.sh

PLIST="$HOME/Library/LaunchAgents/no.veheim.vmtipping.autopush.plist"
SCRIPT="$HOME/VM-Tipping/autopush.sh"
LOG="/tmp/vmtipping-autopush.log"

echo "=== VM-Tipping autopush daemon setup ==="

# 1. Gjer autopush.sh køyrbar
chmod +x "$SCRIPT"
echo "[OK] chmod +x $SCRIPT"

# 2. Opprett plist
mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST" << 'EOF'
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
EOF
echo "[OK] Plist skrive til $PLIST"

# 3. Unload eksisterande (ignorer feil)
launchctl unload "$PLIST" 2>/dev/null
echo "[OK] Unload (evt. ingen å unloade)"

# 4. Load
launchctl load "$PLIST"
echo "[OK] launchctl load"

# 5. Vent og sjekk
sleep 3
echo ""
echo "--- launchctl list | grep vmtipping ---"
launchctl list | grep vmtipping

echo ""
echo "--- Siste 10 linjer av loggen ---"
tail -10 "$LOG" 2>/dev/null || echo "(Ingen logg endå)"

echo ""
echo "=== Setup ferdig ==="
