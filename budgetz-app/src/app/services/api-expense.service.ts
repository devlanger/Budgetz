import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExpenseService } from './expense.service';
import { Expense } from '../models/Expense';

@Injectable({ providedIn: 'root' })
export class ApiExpenseService implements ExpenseService {
  private apiUrl = 'https://localhost:7223/api/Expense';

  constructor(private http: HttpClient) {}

  async updateExpense(expense: Expense): Promise<void> {
    await this.http.put(`${this.apiUrl}/${expense.id}`, expense).toPromise();
  }

  async loadExpensesByYear(year: string): Promise<Expense[]> {
    const params = new HttpParams().set('year', year);
    const result = await this.http.get<Expense[]>(this.apiUrl + "/GetByYear", { params }).toPromise();
    return result ?? [];
  }

  async loadExpenses(month: string): Promise<Expense[]> {
    const params = new HttpParams().set('month', month);
    const result = await this.http.get<Expense[]>(this.apiUrl, { params }).toPromise();
    return result ?? [];
  }

  async addExpense(expense: Expense): Promise<void> {
    await this.http.post(this.apiUrl, expense).toPromise();
  }

  async removeExpense(expense: Expense): Promise<void> {
    await this.http.delete(`${this.apiUrl}/${expense.id}`).toPromise();
  }
}