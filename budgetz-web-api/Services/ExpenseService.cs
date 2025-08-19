using Budgetz.Models;

namespace Budgetz.Services;

public class ExpenseService
{
    public List<Expense> Expenses { get; set; } = new()
    {
        new Expense()
        {
            Id = 0,
            Amount = 100,
            Month = "2025-01",
            Date = DateTimeOffset.Now,
            Name = "Teest"
        }
    };
}
