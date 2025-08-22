using Budgetz.Models;
using Budgetz.Interfaces;
using System.Threading;

namespace Budgetz.Services;

public class ExpenseService : IRepository<Expense>
{
    private int lastId = 1;
    public List<Expense> Expenses { get; set; } = new()
    {
    };

    public Task CreateAsync(Expense entity)
    {
        entity.Id = lastId++;
        Expenses.Add(entity);
        return Task.CompletedTask;
    }

    public Task<bool> DeleteAsync(int id)
    {
        var x = Expenses.FirstOrDefault(e => e.Id == id);
        if (x != null)
        {
            Expenses.Remove(x);
            return Task.FromResult(true);
        }

        return Task.FromResult(false);
    }

    public Task<IEnumerable<Expense>> GetAll() => Task.FromResult(Expenses.AsEnumerable());

    public IQueryable<Expense> Query() => Expenses.AsQueryable();

    public Task UpdateAsync(Expense entity)
    {
        var x = Expenses.FirstOrDefault(x => x.Id == entity.Id);
        if(x != null)   
        {
            Expenses.RemoveAt(Expenses.IndexOf(x));
        }

        Expenses.Add(entity);
        return Task.CompletedTask;
    }
}
