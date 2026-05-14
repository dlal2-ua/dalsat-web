@echo off
title Dalsat Web — Servidor de desarrollo
cd /d "%~dp0"

echo.
echo  ==========================================
echo   Dalsat Web — Arrancando servidor...
echo  ==========================================
echo.
echo  URL: http://localhost:4321
echo  Pulsa Ctrl+C para detener.
echo.

timeout /t 2 /nobreak > nul
start "" "http://localhost:4321"
npm run dev
