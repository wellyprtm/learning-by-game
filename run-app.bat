@echo off
title Milo si Kucing - Game Belajar Anak
echo ==================================================
echo   Menjalankan Game Belajar Anak (Milo si Kucing)
echo ==================================================

echo [1/3] Memeriksa Docker container PostgreSQL...
docker start pg-asset >nul 2>&1

echo [2/3] Menjalankan Backend Golang (Port 8080)...
start "Backend Golang - Milo Game" cmd /k "cd backend && go run ./cmd/server"

echo [3/3] Menjalankan Frontend React (Port 5173)...
start "Frontend React - Milo Game" cmd /k "cd frontend && npm run dev"

timeout /t 3 >nul
echo Membuka browser ke http://localhost:5173 ...
start http://localhost:5173

echo ==================================================
echo Aplikasi berhasil dijalankan!
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080
echo ==================================================
pause
