namespace Budgetz.Models;
public enum RecurringType
{
    None = 0,
    Monthly = 1,
    Yearly = 2
}
public enum ExpenseType
{
    Expense = 0,
    Income = 1
}

public class Expense : EntityBase
{
    public string Name { get; set; }

    public double Amount { get; set; }

    public DateTimeOffset Date { get; set; }
    public string Month { get; set; }
    public string Category { get; set; }
    public RecurringType Recurring { get; set; }
    public ExpenseType Type { get; set; }

}
