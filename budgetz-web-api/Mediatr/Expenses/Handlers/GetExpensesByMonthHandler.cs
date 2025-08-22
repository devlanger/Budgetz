
using Budgetz.Models;
using Budgetz.Interfaces;
using MediatR;
using Budgetz.Mediatr.Expenses.Queries;

public class GetExpensesByMonthHandler : IRequestHandler<GetExpensesByMonthQuery, List<Expense>>
{
    private readonly IRepository<Expense> _expenseRepository;

    public GetExpensesByMonthHandler(IRepository<Expense> expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public Task<List<Expense>> Handle(GetExpensesByMonthQuery request, CancellationToken cancellationToken)
    {
        var result = _expenseRepository.Query()
            .Where(e => e.Month == request.Month || IsReccuring(request.Month, e));

        return Task.FromResult(result.ToList());
    }

    private bool IsReccuring(string month, Expense e) => 
        DateTimeOffset.Parse(e.Month) <= DateTimeOffset.Parse(month) &&
                    DateTimeOffset.Parse(e.Month).Year == DateTimeOffset.Parse(month).Year
                    && e.Recurring == RecurringType.Monthly;
}