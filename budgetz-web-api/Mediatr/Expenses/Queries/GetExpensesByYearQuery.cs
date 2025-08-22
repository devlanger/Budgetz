using MediatR;
using Budgetz.Models;

namespace Budgetz.Mediatr.Expenses.Queries;

public record GetExpensesByYearQuery(string Year) : IRequest<List<Expense>>;