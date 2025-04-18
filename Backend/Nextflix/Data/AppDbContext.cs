using Microsoft.EntityFrameworkCore;
using Nextflix.Models;
using System.Collections.Generic;

namespace Nextflix.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<Film> Films { get; set; }
    public DbSet<Comment> Comments { get; set; }
  }
}
