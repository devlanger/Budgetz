using Budgetz.Models;
using Budgetz.Interfaces;
using Budgetz.Mediatr.Expenses.Commands;
using MediatR;

namespace Budgetz.Mediatr.Expenses.Handlers;

public class DeleteExpenseHandler : IRequestHandler<DeleteExpenseCommand, bool>
{
    private readonly IRepository<Expense> _expenseRepository;

    public DeleteExpenseHandler(IRepository<Expense> expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public async Task<bool> Handle(DeleteExpenseCommand request, CancellationToken cancellationToken)
    {
        return await _expenseRepository.DeleteAsync(request.Id);
    }
}