using Budgetz.Mediatr.Expenses.Queries;
using Budgetz.Models;
using Budgetz.Services;
using Budgetz.Mediatr.Expenses.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Budgetz.Mediatr.Expenses.Models;

namespace Budgetz.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpenseController : ControllerBase
{
    private readonly ILogger<ExpenseController> _logger;
    private readonly IMediator _mediator;

    public object _lock = new();

    public ExpenseController(
        ILogger<ExpenseController> logger,
        IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet]
    public IEnumerable<Expense> Get(string month) => _mediator.Send(new GetExpensesByMonthQuery(month)).Result;

    [HttpGet("GetByYear")]
    public IEnumerable<Expense> GetByYear(string year) => _mediator.Send(new GetExpensesByYearQuery(year)).Result;

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        lock (_lock)
        {
            var value = new { id = id };
            return _mediator.Send(new DeleteExpenseCommand(id)).Result
                ? Ok(value)
                : NotFound(value);       
        }
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateExpenseDto dto)
    {
        var result = _mediator.Send(new CreateExpenseCommand(dto));
        return CreatedAtAction(nameof(Create), result);
    }


    [HttpPut("{id:int}")]
    public IActionResult Edit([FromBody] EditExpenseDto dto)
    {
        var result = _mediator.Send(new EditExpenseCommand(dto));
        return CreatedAtAction(nameof(Create), result);
    }
}
