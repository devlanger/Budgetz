namespace Budgetz.Interfaces;

public interface IRepository<T>
{
    Task UpdateAsync(T entity);
    Task CreateAsync(T entity);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<T>> GetAll();
    IQueryable<T> Query();
}