Param(
  [string]$ProjectPath = "backend",
  [string]$Connection = "Host=localhost;Port=5432;Database=bread;Username=dev;Password=dev"
)

Write-Host "Resetting database 'bread' on local Postgres..."
Write-Host "Ensuring docker compose db is up (optional)..."
docker compose up -d db | Out-Null

# Drop and recreate via psql inside container
docker compose exec -T db psql -U dev -c "DROP DATABASE IF EXISTS bread;" | Out-Null
docker compose exec -T db psql -U dev -c "CREATE DATABASE bread;" | Out-Null

Write-Host "Applying EF Core migrations..."
pushd $ProjectPath | Out-Null
dotnet build | Out-Null
dotnet ef database update | Out-Null
popd | Out-Null

Write-Host "Done."

