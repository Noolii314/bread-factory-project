Write-Host "Starting Postgres and backend/frontends for dev..."

Start-Process powershell -ArgumentList "-NoProfile","-Command","docker compose up -d db"
Start-Process powershell -ArgumentList "-NoProfile","-Command","cd backend; dotnet watch run"
Start-Process powershell -ArgumentList "-NoProfile","-Command","cd frontend-app; npm run dev"

Write-Host "Launched. Use Ctrl+C in spawned terminals to stop."

