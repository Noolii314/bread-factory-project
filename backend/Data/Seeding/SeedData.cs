using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Seeding
{
    public class SeedData
    {
        private readonly AppDbContext _db;
        public SeedData(AppDbContext db) { _db = db; }

        public async Task SeedAsync(CancellationToken ct = default)
        {
            await _db.Database.MigrateAsync(ct);

            if (!await _db.Lines.AnyAsync(ct))
            {
                _db.Lines.AddRange(new[]
                {
                    new Line { Name = "Line A" },
                    new Line { Name = "Line B" },
                    new Line { Name = "Line C" },
                });
                await _db.SaveChangesAsync(ct);
            }

            // TODO: Extend with Production, Quality, Maintenance, Alerts seeding
        }
    }
}

