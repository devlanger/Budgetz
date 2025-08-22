
using Budgetz.Models;
using Budgetz.Interfaces;
using MediatR;
using Budgetz.Mediatr.Expenses.Queries;

public class GetExpensesByYearHandler : IRequestHandler<GetExpensesByYearQuery, List<Expense>>
{
    private readonly IRepository<Expense> _expenseRepository;

    public GetExpensesByYearHandler(IRepository<Expense> expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public Task<List<Expense>> Handle(GetExpensesByYearQuery request, CancellationToken cancellationToken)
    {
        int year = int.Parse(request.Year);

        var result = _expenseRepository.Query()
            .AsEnumerable() // switch to in-memory LINQ
            .Where(e => DateTimeOffset.Parse(e.Month).Year == year)
            .SelectMany(e =>
            {
                var start = DateTimeOffset.Parse(e.Month);

                if (e.Recurring == RecurringType.Monthly)
                {
                    return Enumerable.Range(start.Month, 12 - start.Month + 1)
                        .Select(m => new Expense
                        {
                            Id = e.Id,
                            Name = e.Name,
                            Amount = e.Amount,
                            Month = new DateTimeOffset(year, m, 1, 0, 0, 0, TimeSpan.Zero)
                                        .ToString("yyyy-MM"),
                            Category = e.Category
                        });
                }

                return new[] { e };
            })
            .ToList();

        return Task.FromResult(result);
    }
}