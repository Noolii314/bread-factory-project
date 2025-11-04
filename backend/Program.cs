// minimal API skeleton from canvas
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Backend.Api.Production;

var builder = WebApplication.CreateBuilder(args);
var cs = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(cs));
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

// Seeding
builder.Services.AddScoped<Backend.Data.Seeding.SeedData>();

var app = builder.Build();
app.UseSwagger(); app.UseSwaggerUI();
app.UseCors();

app.MapGet("/health", () => Results.Ok(new { ok = true }));

// API route groups
app.MapProduction();

// Optional seeding (only when --seed flag provided)
if (args.Contains("--seed"))
{
    using var scope = app.Services.CreateScope();
    var seeder = scope.ServiceProvider.GetRequiredService<Backend.Data.Seeding.SeedData>();
    await seeder.SeedAsync();
}

app.Run();
