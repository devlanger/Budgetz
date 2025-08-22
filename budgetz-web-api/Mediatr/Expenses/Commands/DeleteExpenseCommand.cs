using MediatR;

namespace Budgetz.Mediatr.Expenses.Commands;

public record DeleteExpenseCommand(int Id) : IRequest<bool>;
