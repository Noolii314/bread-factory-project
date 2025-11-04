"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Factory, TrendingUp, Gauge, AlertTriangle, CheckCircle, Wrench } from "lucide-react";

// ----------------------------
// MOCK DATA (zëvendësoje me API/DB)
// ----------------------------
const kpis = {
  totalLoaves: 36250,
  yieldPct: 93.4,
  defectRate: 2.1,
  oee: 78.6,
};

const productionSeries = [
  { ts: "06:00", value: 720 },
  { ts: "07:00", value: 860 },
  { ts: "08:00", value: 910 },
  { ts: "09:00", value: 880 },
  { ts: "10:00", value: 940 },
  { ts: "11:00", value: 995 },
  { ts: "12:00", value: 1010 },
  { ts: "13:00", value: 980 },
  { ts: "14:00", value: 1025 },
  { ts: "15:00", value: 990 },
];

const qualityBreakdown = [
  { name: "Në standard", value: 92 },
  { name: "Nën peshë", value: 3 },
  { name: "Mbipjekje", value: 2 },
  { name: "Formë jo standard", value: 3 },
];

const downtimeByCause = [
  { cause: "Mirëmbajtje", min: 42 },
  { cause: "Ndalesë Furra Bamak", min: 28 },
  { cause: "Mungesë brumi", min: 18 },
  { cause: "Ndryshim kallepe", min: 12 },
];

const spcWeights = [
  { lot: "L-101", w: 510 },
  { lot: "L-102", w: 503 },
  { lot: "L-103", w: 499 },
  { lot: "L-104", w: 505 },
  { lot: "L-105", w: 496 },
  { lot: "L-106", w: 508 },
  { lot: "L-107", w: 501 },
];

const equipment = [
  { name: "Furra Bamak", status: "AKTIVE", temp: 235, vibration: 0.7 },
  { name: "Furra Baguette", status: "MIRËMBAJTJE", temp: 0, vibration: 0 },
  { name: "Përzierësja Bamak", status: "AKTIVE", temp: 42, vibration: 0.3 },
  { name: "Përzierësja Baguette", status: "DEFEKT", temp: 0, vibration: 0 },
  { name: "Tuneli i ftohjes", status: "AKTIVE", temp: 7, vibration: 0.1 },
];

const alerts = [
  { id: 1, type: "kritike", title: "Furra Baguette – ndalesë e paplanifikuar", detail: "Motor ventilatori", time: "10:24" },
  { id: 2, type: "paralajmërim", title: "Pesha mesatare afër UL", detail: "Lot L-105", time: "09:55" },
  { id: 3, type: "info", title: "Mirëmbajtje parandaluese", detail: "Përzierësja 2 - ora 16:00", time: "08:10" },
];

const COLORS = ["#16a34a", "#ef4444", "#f59e0b", "#3b82f6"]; // mund t'i zëvendësosh me paletën e brandit

// ----------------------------
// KOMPONENTË NDIHMËS
// ----------------------------
function Kpi({ icon: Icon, label, value, suffix }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; suffix?: string }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="rounded-2xl p-3 bg-muted">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold">{value}{suffix}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    AKTIVE: { label: "Aktive", className: "bg-green-100 text-green-700" },
    "MIRËMBAJTJE": { label: "Mirëmbajtje", className: "bg-yellow-100 text-yellow-700" },
    DEFEKT: { label: "Defekt", className: "bg-red-100 text-red-700" },
  };
  const s = map[status] ?? { label: status, className: "bg-slate-100 text-slate-700" };
  return <Badge className={`px-2 py-1 ${s.className}`}>{s.label}</Badge>;
}

// ----------------------------
// FAQJA KRYESORE E DASHBOARD-IT
// ----------------------------
export default function BreadFactoryControlCenter() {
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Factory className="h-8 w-8" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">Control Center – Premium Bakery</h1>
            <p className="text-sm text-muted-foreground">Monitorim i integruar: prodhimi • cilësia • pajisjet • mirëmbajtja</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="dita">
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="Intervali" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ora">Ora</SelectItem>
              <SelectItem value="dita">Dita</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="muaji">Muaji</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="T1">
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="Turni" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="T1">Turni 1</SelectItem>
              <SelectItem value="T2">Turni 2</SelectItem>
              <SelectItem value="T3">Turni 3</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="L1">
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Linja" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="L1">Linja 1</SelectItem>
              <SelectItem value="L2">Linja 2</SelectItem>
              <SelectItem value="Të gjitha">Të gjitha</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Kërko (p.sh. Furra 2, L-105)" className="w-[240px]" />
          <Button>Eksporto Raport</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Kpi icon={TrendingUp} label="Numri total i bukëve" value={kpis.totalLoaves.toLocaleString()} />
        <Kpi icon={CheckCircle} label="Yield" value={kpis.yieldPct} suffix="%" />
        <Kpi icon={AlertTriangle} label="Defect rate" value={kpis.defectRate} suffix="%" />
        <Kpi icon={Gauge} label="OEE" value={kpis.oee} suffix="%" />
      </div>

      {/* RRJETË KRYESORE: 2 KOLUMNA */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Kolona e gjerë (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Prodhimi në kohë */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle>Prodhimi (bukë/orë)</CardTitle></CardHeader>
            <CardContent className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionSeries} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillProd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ts" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#fillProd)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* SPC – peshat */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle>SPC: Pesha e mostrave (g)</CardTitle></CardHeader>
            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spcWeights}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="lot" />
                  <YAxis domain={[480, 520]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="w" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  {/* Linja e mesatares dhe kufijtë (shembull vizual) */}
                  <Line type="linear" dataKey={() => 505} stroke="#6b7280" strokeDasharray="6 6" isAnimationActive={false} />
                  <Line type="linear" dataKey={() => 495} stroke="#ef4444" strokeDasharray="4 4" isAnimationActive={false} />
                  <Line type="linear" dataKey={() => 515} stroke="#ef4444" strokeDasharray="4 4" isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Kolona e ngushtë (1/3) */}
        <div className="space-y-6">
          {/* Cilësia – shpërndarja */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle>Cilësia – Shpërndarje</CardTitle></CardHeader>
            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie data={qualityBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                    {qualityBreakdown.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 flex flex-wrap gap-2">
                {qualityBreakdown.map((q, idx) => (
                  <Badge key={q.name} className="gap-2"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: COLORS[idx % COLORS.length] }} />{q.name}: {q.value}%</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Downtime sipas shkakut */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle>Downtime sipas shkakut (min)</CardTitle></CardHeader>
            <CardContent className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={downtimeByCause}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cause" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="min" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PAJISJET & ALARMET */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Pajisjet */}
        <Card className="xl:col-span-2 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>Statusi i Pajisjeve</CardTitle>
            <div className="text-sm text-muted-foreground">IA Maint. Predictive: <Badge className="bg-blue-100 text-blue-700">OK</Badge></div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b">
                    <th className="py-2">Pajisja</th>
                    <th className="py-2">Statusi</th>
                    <th className="py-2">Temperatura</th>
                    <th className="py-2">Vibrimi</th>
                    <th className="py-2">Parashikim IA</th>
                    <th className="py-2">Veprim</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((m) => (
                    <tr key={m.name} className="border-b last:border-0">
                      <td className="py-3 font-medium">{m.name}</td>
                      <td className="py-3"><StatusBadge status={m.status} /></td>
                      <td className="py-3">{m.temp ? `${m.temp}°C` : "—"}</td>
                      <td className="py-3">{m.vibration} mm/s</td>
                      <td className="py-3">
                        {m.status === "DEFEKT" ? (
                          <Badge className="bg-red-100 text-red-700">Rrezik i lartë</Badge>
                        ) : m.status === "MIRËMBAJTJE" ? (
                          <Badge className="bg-yellow-100 text-yellow-700">Inspekto sot</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">Stabil</Badge>
                        )}
                      </td>
                      <td className="py-3">
                        <Button size="sm" variant="outline" className="gap-2"><Wrench className="h-4 w-4"/> Ticket</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alarmet & Insight-et IA */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle>Alarmet & Insight-et IA</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl border">
                {a.type === "kritike" ? (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                ) : a.type === "paralajmërim" ? (
                  <Gauge className="h-5 w-5 text-yellow-600 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                )}
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.detail}</div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">{a.time}</div>
              </div>
            ))}
            <Separator />
            <div className="text-sm">
              <div className="font-medium mb-1">Sugjerim IA:</div>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Rrisni temperaturën e Furrës 1 me +5°C për 30 min për të ulur normën e nën-peshës.</li>
                <li>Planifikoni mirëmbajtje për Përzierësja 2 brenda 8 orësh (trend vibrimi në rritje).</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ============================== BACKEND (.NET 8 + PostgreSQL) ==============================
   Strukturë skeleti për API-në dhe DB që lidhen me këtë dashboard. Kopjo këto file në një
   folder "backend/" pranë "frontend/". Pastaj ndiq hapat e mëposhtëm për ekzekutim me Docker.
=========================================================================================== */

// FILE: backend/Backend.csproj
// <Project Sdk="Microsoft.NET.Sdk.Web">
//   <PropertyGroup>
//     <TargetFramework>net8.0</TargetFramework>
//     <Nullable>enable</Nullable>
//     <ImplicitUsings>enable</ImplicitUsings>
//   </PropertyGroup>
//   <ItemGroup>
//     <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.8" />
//     <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.4" />
//     <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
//     <PackageReference Include="Microsoft.AspNetCore.SignalR" Version="1.1.0" />
//     <PackageReference Include="Microsoft.Extensions.Logging.Console" Version="8.0.0" />
//   </ItemGroup>
// </Project>

// FILE: backend/appsettings.json
// {
//   "ConnectionStrings": {
//     "Default": "Host=db;Port=5432;Database=bread;Username=dev;Password=dev"
//   },
//   "AllowedHosts": "*"
// }

// FILE: backend/Models/Entities.cs
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
// namespace Backend.Models {
//   public class Line { public int Id {get;set;} [MaxLength(64)] public string Name {get;set;} = string.Empty; }
//   public class Equipment { public int Id {get;set;} public int LineId {get;set;} [MaxLength(64)] public string Name {get;set;}=string.Empty; [MaxLength(64)] public string Type {get;set;}=string.Empty; public int Criticality {get;set;} }
//   public class SensorReading { public long Id {get;set;} public int EquipmentId {get;set;} [MaxLength(64)] public string Metric {get;set;}=string.Empty; public double Value {get;set;} [MaxLength(16)] public string Unit {get;set;}=""; public DateTime Ts {get;set;} = DateTime.UtcNow; }
//   public class Product { public int Id {get;set;} [MaxLength(64)] public string Sku {get;set;}=string.Empty; [MaxLength(128)] public string Name {get;set;}=string.Empty; public int TargetWeightG {get;set;} public int? TargetTempC {get;set;} }
//   public class Batch { public int Id {get;set;} public int ProductId {get;set;} [MaxLength(64)] public string Code {get;set;}=string.Empty; public int LineId {get;set;} public int ShiftId {get;set;} public DateTime StartedAt {get;set;} public DateTime? EndedAt {get;set;} }
//   public class QualitySample { public int Id {get;set;} public int BatchId {get;set;} [MaxLength(64)] public string LotCode {get;set;}=string.Empty; public int WeightG {get;set;} public double? MoisturePct {get;set;} public bool InSpec {get;set;} public DateTime TakenAt {get;set;} = DateTime.UtcNow; }
//   public class ProductionRun { public int Id {get;set;} public int BatchId {get;set;} public DateTime Timestamp {get;set;} public int LoavesCount {get;set;} public int RejectsCount {get;set;} public double OeePct {get;set;} }
//   public class DowntimeEvent { public int Id {get;set;} public int EquipmentId {get;set;} [MaxLength(96)] public string Cause {get;set;}=string.Empty; public DateTime StartedAt {get;set;} public DateTime? EndedAt {get;set;} [MaxLength(256)] public string? Notes {get;set;} }
//   public class Alert { public int Id {get;set;} [MaxLength(16)] public string Level {get;set;}=string.Empty; [MaxLength(128)] public string Title {get;set;}=string.Empty; [MaxLength(256)] public string Detail {get;set;}=string.Empty; [MaxLength(32)] public string Source {get;set;}="system"; public DateTime CreatedAt {get;set;} = DateTime.UtcNow; public string? AcknowledgedBy {get;set;} }
// }

// FILE: backend/Data/AppDbContext.cs
// using Backend.Models;
// using Microsoft.EntityFrameworkCore;
// namespace Backend.Data {
//   public class AppDbContext : DbContext {
//     public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) {}
//     public DbSet<Line> Lines => Set<Line>();
//     public DbSet<Equipment> Equipment => Set<Equipment>();
//     public DbSet<SensorReading> SensorReadings => Set<SensorReading>();
//     public DbSet<Product> Products => Set<Product>();
//     public DbSet<Batch> Batches => Set<Batch>();
//     public DbSet<QualitySample> QualitySamples => Set<QualitySample>();
//     public DbSet<ProductionRun> ProductionRuns => Set<ProductionRun>();
//     public DbSet<DowntimeEvent> DowntimeEvents => Set<DowntimeEvent>();
//     public DbSet<Alert> Alerts => Set<Alert>();
//     protected override void OnModelCreating(ModelBuilder b) {
//       b.Entity<SensorReading>().HasIndex(x => new { x.EquipmentId, x.Ts });
//       b.Entity<ProductionRun>().HasIndex(x => x.Timestamp);
//       b.Entity<Batch>().HasIndex(x => x.Code).IsUnique();
//       b.Entity<Product>().HasIndex(x => x.Sku).IsUnique();
//     }
//   }
// }

// FILE: backend/Program.cs
// using Backend.Data;
// using Backend.Models;
// using Microsoft.EntityFrameworkCore;
// var builder = WebApplication.CreateBuilder(args);
// var cs = builder.Configuration.GetConnectionString("Default");
// builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(cs));
// builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// builder.Services.AddSignalR();
// var app = builder.Build();
// app.UseSwagger(); app.UseSwaggerUI();
// app.UseCors();
// app.MapGet("/health", () => Results.Ok(new { ok = true }));
// app.MapGet("/api/kpis", async (AppDbContext db) => {
//   var today = DateTime.UtcNow.Date;
//   var total = await db.ProductionRuns.Where(x => x.Timestamp >= today).SumAsync(x => (int?)x.LoavesCount) ?? 0;
//   var rejects = await db.ProductionRuns.Where(x => x.Timestamp >= today).SumAsync(x => (int?)x.RejectsCount) ?? 0;
//   var defectRate = total == 0 ? 0 : (rejects * 100.0 / total);
//   var oee = await db.ProductionRuns.Where(x => x.Timestamp >= today).AverageAsync(x => (double?)x.OeePct) ?? 0;
//   var yield = total == 0 ? 0 : 100 - defectRate;
//   return Results.Ok(new { totalLoaves = total, yieldPct = yield, defectRate = Math.Round(defectRate,1), oee = Math.Round(oee,1) });
// });
// app.MapGet("/api/production", async (AppDbContext db, DateTime? from, DateTime? to, int? lineId) => {
//   var q = db.ProductionRuns.AsQueryable();
//   if (from.HasValue) q = q.Where(x => x.Timestamp >= from);
//   if (to.HasValue) q = q.Where(x => x.Timestamp <= to);
//   if (lineId.HasValue) q = q.Where(x => db.Batches.Where(b => b.Id == x.BatchId && b.LineId == lineId).Any());
//   var data = await q.OrderBy(x => x.Timestamp)
//     .Select(x => new { ts = x.Timestamp, value = x.LoavesCount })
//     .ToListAsync();
//   return Results.Ok(data);
// });
// app.MapGet("/api/quality/samples", async (AppDbContext db, int batchId) => {
//   var data = await db.QualitySamples.Where(x => x.BatchId == batchId)
//     .OrderBy(x => x.TakenAt)
//     .Select(x => new { lot = x.LotCode, w = x.WeightG })
//     .ToListAsync();
//   return Results.Ok(data);
// });
// app.MapGet("/api/equipment", async (AppDbContext db) => {
//   var eq = await db.Equipment.Select(x => new {
//     name = x.Name, status = "AKTIVE", temp = 0, vibration = 0.0 // TODO: llogarit nga SensorReadings
//   }).ToListAsync();
//   return Results.Ok(eq);
// });
// app.MapGet("/api/downtime", async (AppDbContext db, DateTime? from, DateTime? to) => {
//   var q = db.DowntimeEvents.AsQueryable();
//   if (from.HasValue) q = q.Where(x => x.StartedAt >= from);
//   if (to.HasValue) q = q.Where(x => x.StartedAt <= to);
//   var data = await q.ToListAsync();
//   var grouped = data
//     .GroupBy(x => x.Cause)
//     .Select(g => new { cause = g.Key, min = g.Sum(e => (int)((e.EndedAt ?? DateTime.UtcNow) - e.StartedAt).TotalMinutes) })
//     .OrderByDescending(x => x.min)
//     .ToList();
//   return Results.Ok(grouped);
// });
// app.MapGet("/api/alerts", async (AppDbContext db) => Results.Ok(await db.Alerts.OrderByDescending(a => a.CreatedAt).Take(50).ToListAsync()));
// app.MapPost("/api/alerts", async (AppDbContext db, Alert a) => { db.Alerts.Add(a); await db.SaveChangesAsync(); return Results.Created($"/api/alerts/{a.Id}", a); });
// app.Run();

// FILE: backend/Dockerfile
// FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
// WORKDIR /app
// EXPOSE 8080
// FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
// WORKDIR /src
// COPY . .
// RUN dotnet restore ./Backend.csproj
// RUN dotnet publish ./Backend.csproj -c Release -o /out
// FROM base AS final
// WORKDIR /app
// COPY --from=build /out .
// ENTRYPOINT ["dotnet", "Backend.dll"]

// ============================= DOCKER & DATABASE =============================
// FILE: docker-compose.yml (në root të projektit)
// services:
//   db:
//     image: postgres:16
//     environment:
//       POSTGRES_PASSWORD: dev
//       POSTGRES_USER: dev
//       POSTGRES_DB: bread
//     ports: ["5432:5432"]
//     volumes: [db-data:/var/lib/postgresql/data]
//   backend:
//     build: ./backend
//     environment:
//       ASPNETCORE_URLS: http://+:8080
//     depends_on: [db]
//     ports: ["8080:8080"]
//   # frontend-in (Next.js) mund ta shërbesh lokalisht me `npm run dev` ose të shtosh një shërbim këtu
// volumes: { db-data: {} }

// ============================= MIGRIME (EF Core) =============================
// Komanda (nga folderi backend/):
//   dotnet tool install --global dotnet-ef
//   dotnet ef migrations add Initial
//   dotnet ef database update
// Me Docker: mund të lëshojmë migrimet në entrypoint ose manualisht nga hosti pasi të ngrihet db-ja.

// ============================= FRONTEND: LIDHJA ME API =============================
// Në React/Next, zëvendëso mock data me thirrje reale:
//   useEffect(() => { fetch("http://localhost:8080/api/kpis").then(r=>r.json()).then(setKpis); }, []);
//   useEffect(() => { fetch("http://localhost:8080/api/production?from=2025-11-02").then(r=>r.json()).then(setProduction); }, []);
// Mos harro CORS (është aktivizuar me AllowAny* në Program.cs për dev). Për prod, konfiguro origin specifik.

// ============================= OPC-UA / MQTT (opsionale) =============================
// Publiko telemetri te MQTT dhe konsumoje në backend për ta ruajtur në SensorReadings.
// Topic shembull: factory/sensors/furra-1/temperature => { value: 235, unit: "C", ts: "2025-11-02T10:00:00Z" }
// Këtë pipeline mund ta shkruash si HostedService në .NET që abonon te MQTT dhe bën upsert në DB.

// ============================= SIGURIA & OBSERVABILITY =============================
// - JWT Auth (shton AddAuthentication + AddAuthorization), role Operator/QA/Maintenance/Manager
// - Swagger për kontratë, OpenTelemetry për traces/metrics, Serilog për logs
// - Backup ditor Postgres, indeksime sipas grafiqeve që përdor më shpesh

