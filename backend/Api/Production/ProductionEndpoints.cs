using Backend.Data;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Api.Production
{
    public static class ProductionEndpoints
    {
        public static RouteGroupBuilder MapProduction(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/production");

            group.MapGet("/lines", async (AppDbContext db) =>
            {
                var items = await db.Lines
                    .AsNoTracking()
                    .Select(l => new LineDto { Id = l.Id, Name = l.Name })
                    .ToListAsync();
                return Results.Ok(items);
            });

            return group;
        }
    }

    public class LineDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
