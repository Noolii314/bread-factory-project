using Backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Backend.Data {
  public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) {}
    public DbSet<Line> Lines => Set<Line>();
  }
}
