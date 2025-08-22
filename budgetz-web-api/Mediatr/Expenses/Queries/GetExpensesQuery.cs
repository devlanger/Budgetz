using MediatR;
using Budgetz.Models;

namespace Budgetz.Mediatr.Expenses.Queries;

public record GetExpensesQuery() : IRequest<List<Expense>>;