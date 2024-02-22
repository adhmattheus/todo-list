namespace todoList.API.Model;

public class TodoItem
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Status { get; set; }

    public TodoItem(int id, string title, string status)
    {
        Id = id;
        Title = title;
        Status = status;
    }
}
