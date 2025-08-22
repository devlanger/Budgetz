
using Budgetz.Interfaces;
using Budgetz.Models;
using Budgetz.Services;
using MediatR;
using System.Reflection;

namespace Budgetz;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost", policy =>
            {
                policy.WithOrigins("http://localhost:4200") // Angular dev server
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        builder.Services.AddSingleton<IRepository<Expense>, ExpenseService>();
        builder.Services.AddMediatR(Assembly.GetExecutingAssembly());

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();
        app.UseCors("AllowLocalhost");

        app.UseAuthorization();
        app.UseSwagger();
        app.UseSwaggerUI();

        app.MapControllers();

        app.Run();
    }
}
