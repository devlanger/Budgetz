using Budgetz.Mediatr.Expenses.Models;
using MediatR;

namespace Budgetz.Mediatr.Expenses.Commands;

public record CreateExpenseCommand(CreateExpenseDto model) : IRequest<bool>;
