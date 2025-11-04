Param(
  [string]$ProjectPath = "backend"
)

Write-Host "Starting database (docker) and applying migrations..."
docker compose up -d db | Out-Null

pushd $ProjectPath | Out-Null
dotnet build | Out-Null
dotnet ef database update | Out-Null

Write-Host "Running backend seeder (--seed)..."
dotnet run -- --seed | Out-Null
popd | Out-Null

Write-Host "Seeding complete."

