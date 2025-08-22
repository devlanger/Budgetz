using Budgetz.Models;
using Budgetz.Interfaces;
using Budgetz.Mediatr.Expenses.Commands;
using MediatR;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Budgetz.Mediatr.Expenses.Handlers;

public class EditExpenseHandler : IRequestHandler<EditExpenseCommand, bool>
{
    private readonly IRepository<Expense> _expenseRepository;

    public EditExpenseHandler(IRepository<Expense> expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public Task<bool> Handle(EditExpenseCommand request, CancellationToken cancellationToken)
    {
        var x = _expenseRepository.Query().FirstOrDefault(e => e.Id == request.model.Id);

        if (x == null)
            return Task.FromResult(true);

        x.Amount = request.model.Amount;
        x.Month = request.model.Month;
        x.Date = request.model.Date;
        x.Name = request.model.Name;
        x.Category = request.model.Category;
        x.Recurring = request.model.Recurring;
        x.Type = request.model.Type;

        var result = _expenseRepository.UpdateAsync(x);

        return Task.FromResult(true);
    }
}