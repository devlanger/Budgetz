
using Budgetz.Models;
using Budgetz.Interfaces;
using MediatR;
using Budgetz.Mediatr.Expenses.Queries;

public class GetExpensesHandler : IRequestHandler<GetExpensesQuery, List<Expense>>
{
    private readonly IRepository<Expense> _expenseRepository;

    public GetExpensesHandler(IRepository<Expense> expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public Task<List<Expense>> Handle(GetExpensesQuery request, CancellationToken cancellationToken)
    {
        var result = _expenseRepository.Query().ToList();
        return Task.FromResult(result);
    }
}