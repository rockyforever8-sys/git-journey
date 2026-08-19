#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "→ Installing dependencies (first run may take a few minutes)..."
npm install
echo ""
echo "→ Starting Expo — QR code will appear below in ~30 seconds..."
echo "→ On Android: open Expo Go → Scan QR code"
echo ""
npm start
