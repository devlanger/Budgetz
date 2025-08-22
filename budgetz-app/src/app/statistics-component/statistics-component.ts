import { Component, Input } from '@angular/core';
import { Expense, ExpenseType } from '../models/Expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-component.html',
  styleUrl: './statistics-component.scss'
})
export class StatisticsComponent {
  @Input() expenses: Expense[] = [];
  @Input() categories: string[] = [];

  get total(): number {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
  }

  getCategoryStats() {
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
