using Budgetz.Models;
using System.Text.Json.Serialization;

namespace Budgetz.Mediatr.Expenses.Models;

public class CreateExpenseDto
{
    public string Name { get; set; }
    public double Amount { get; set; }
    public DateTimeOffset Date { get; set; }
    public string Month { get; set; }
    public string Category { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public RecurringType Recurring { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ExpenseType Type { get; set; }
}