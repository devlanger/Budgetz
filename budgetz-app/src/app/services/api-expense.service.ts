import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Expense, ExpenseService } from './expense.service';

@Injectable({ providedIn: 'root' })
export class ApiExpenseService implements ExpenseService {
  private apiUrl = 'https://localhost:7223/api/Expense';

  constructor(private http: HttpClient) {}

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