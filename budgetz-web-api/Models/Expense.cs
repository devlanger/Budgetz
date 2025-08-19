namespace Budgetz.Models;

public class Expense : EntityBase
{
    public string Name { get; set; }

    public double Amount { get; set; }

    public DateTimeOffset Date { get; set; }
    public string Month { get; set; }
}
