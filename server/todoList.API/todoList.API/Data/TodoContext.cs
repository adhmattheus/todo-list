using Microsoft.EntityFrameworkCore;
using todoList.API.Model;

namespace todoList.API.Data;

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {

    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;
}
