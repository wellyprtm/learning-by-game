Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Menjalankan Game Belajar Anak (Milo si Kucing)  " -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Pastikan PostgreSQL berjalan
Write-Host "[1/3] Memeriksa container PostgreSQL..." -ForegroundColor Green
docker start pg-asset | Out-Null

# 2. Jalankan Backend
Write-Host "[2/3] Menjalankan Backend Golang..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; go run ./cmd/server"

# 3. Jalankan Frontend
Write-Host "[3/3] Menjalankan Frontend React..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Start-Sleep -Seconds 3
Write-Host "Membuka browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host "Aplikasi berhasil dijalankan!" -ForegroundColor Green
