import { Injectable } from '@angular/core';
import { Expense, ExpenseService } from './expense.service';

@Injectable({ providedIn: 'root' })
export class LocalExpenseService implements ExpenseService {
  private expenses: Expense[] = [
    { id: 1, name: 'Groceries', amount: 100, month: '2025-01' },
    { id: 2, name: 'Utilities', amount: 50, month: '2025-01' },
  ];

  async loadExpenses(month: string): Promise<Expense[]> {
    return [...this.expenses];
  }

  async addExpense(expense: Expense): Promise<void> {
    this.expenses.push(expense);
  }

  async removeExpense(expense: Expense): Promise<void> {
    const index = this.expenses.findIndex(e => e.name === expense.name && e.amount === expense.amount);
    if (index > -1) this.expenses.splice(index, 1);
  }
}