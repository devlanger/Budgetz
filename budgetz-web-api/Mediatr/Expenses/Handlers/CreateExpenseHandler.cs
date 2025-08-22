using Budgetz.Models;
using Budgetz.Interfaces;
using Budgetz.Mediatr.Expenses.Commands;
using MediatR;

namespace Budgetz.Mediatr.Expenses.Handlers;

public class CreateExpenseHandler : IRequestHandler<CreateExpenseCommand, bool>
{
    private readonly IRepository<Expense> _expenseRepository;

    public CreateExpenseHandler(IRepository<Expense> expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public Task<bool> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
    {
        var result = _expenseRepository.CreateAsync(new Expense()
        {
            Amount = request.model.Amount,
            Month = request.model.Month,
            Date = request.model.Date,
            Name = request.model.Name,
            Category = request.model.Category,
            Recurring = request.model.Recurring,
            Type = request.model.Type,
        });

        return Task.FromResult(true);
    }
}