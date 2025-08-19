using Budgetz.Models;
using Budgetz.Services;
using Microsoft.AspNetCore.Mvc;

namespace Budgetz.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpenseController : ControllerBase
{
    private readonly ILogger<ExpenseController> _logger;
    private readonly ExpenseService _expenseService;

    public object _lock = new();

    public ExpenseController(
        ILogger<ExpenseController> logger,
        ExpenseService expenseService)
    {
        _logger = logger;
        _expenseService = expenseService;
    }

    public IEnumerable<Expense> Get(string month)
    {
        return _expenseService.Expenses.Where(e => e.Month == month).ToList();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        lock (_lock)
        {
            var x = _expenseService.Expenses.FirstOrDefault(e => e.Id == id);
            if(x != null)
            {
                _expenseService.Expenses.Remove(x);
            }
        }

        return CreatedAtAction(nameof(Delete), new { id = id });
    }

    [HttpPost]
    public IActionResult Create([FromBody] Expense expense)
    {
        var e = new Expense()
        {
            Id = _expenseService.Expenses.Count + 1,
            Name = expense.Name,
            Amount = expense.Amount,
            Date = expense.Date,
            Month = expense.Month
        };

        _expenseService.Expenses.Add(e);
        return CreatedAtAction(nameof(Create), new { id = expense.Id }, expense);
    }
}
