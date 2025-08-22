using Budgetz.Mediatr.Expenses.Models;
using MediatR;

namespace Budgetz.Mediatr.Expenses.Commands;

public record EditExpenseCommand(EditExpenseDto model) : IRequest<bool>;
