@echo off
cd /d "%~dp0"
echo Installing dependencies (first run may take a few minutes)...
call npm install
echo.
echo Starting Expo - QR code will appear below in ~30 seconds...
echo On Android: open Expo Go - Scan QR code
echo.
call npm start
