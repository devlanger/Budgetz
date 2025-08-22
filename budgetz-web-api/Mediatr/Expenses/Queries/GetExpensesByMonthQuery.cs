using MediatR;
using Budgetz.Models;

namespace Budgetz.Mediatr.Expenses.Queries;

public record GetExpensesByMonthQuery(string Month) : IRequest<List<Expense>>;