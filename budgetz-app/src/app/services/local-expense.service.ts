import { Injectable } from '@angular/core';
import { ExpenseService } from './expense.service';
import { Expense, ExpenseType } from '../models/Expense';

@Injectable({ providedIn: 'root' })
export class LocalExpenseService implements ExpenseService {
  
  async updateExpense(expense: Expense): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private expenses: Expense[] = [
    { id: 1, name: 'Groceries', amount: 100, month: '2025-01', category: 'Food', type: ExpenseType.Expense },
    { id: 2, name: 'Utilities', amount: 50, month: '2025-01', category: 'Utilities', type: ExpenseType.Expense },
  ];

  async loadExpenses(month: string): Promise<Expense[]> {
    return [...this.expenses];
  }

  async loadExpensesByYear(year: string): Promise<Expense[]> {
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