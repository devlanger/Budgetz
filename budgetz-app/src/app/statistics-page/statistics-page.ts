import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expense, ExpenseType } from '../models/Expense';
import { ApiExpenseService } from '../services/api-expense.service';
import { ChartsComponent } from "../chart-component/chart-component";

@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [CommonModule, ChartsComponent],
  templateUrl: './statistics-page.html',
  styleUrls: ['./statistics-page.scss']
})
export class StatisticsPageComponent implements OnInit {
  expenses: Expense[] = [];
  categories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Transport', 'Other'];
  loading = false;
  currentYear = new Date().getFullYear();

  constructor(private expenseService: ApiExpenseService) {}

  async ngOnInit() {
    this.loading = true;
    this.expenses = await this.expenseService.loadExpensesByYear(this.currentYear.toString());
    this.loading = false;
  }

  getYearlyStats() {
    const stats: { category: string; amount: number; percent: number }[] = [];
    const expensesOnly = this.expenses.filter(e => e.type === ExpenseType.Expense);
    const total = expensesOnly.reduce((sum, e) => sum + e.amount, 0);

    for (const cat of this.categories) {
      const amount = expensesOnly
        .filter(e => e.category === cat)
        .reduce((sum, e) => sum + e.amount, 0);
      const percent = total ? Math.round((amount / total) * 100) : 0;
      if (percent > 0) {
        stats.push({ category: cat, amount, percent });
      }
    }
    return stats;
  }
}
