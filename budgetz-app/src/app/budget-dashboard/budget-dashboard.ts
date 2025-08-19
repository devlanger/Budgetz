import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalExpenseService } from '../services/local-expense.service';
import { Expense } from '../services/expense.service';
import { ApiExpenseService } from '../services/api-expense.service';

@Component({
  selector: 'app-budget-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget-dashboard.html',
  styleUrl: './budget-dashboard.scss'
})
export class BudgetDashboard implements OnInit {
  months = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'];
  selectedMonth = this.months[new Date().getMonth()];
  expenses: Expense[] = [];
  totalBudget = 10000;
  showModal = false;
  newExpenseName = '';
  newExpenseAmount: number | null = null;
  loading = false;

  constructor(private expenseService: ApiExpenseService) {}

  async ngOnInit() {
    this.loading = true;
    let loaded = false;
    let attempts = 0;
    while (!loaded && attempts < 5) { // Try up to 5 times
      try {
        this.expenses = await this.expenseService.loadExpenses(this.selectedMonth);
        loaded = this.expenses.length > 0;
      } catch (error) {
        console.error('Failed to load expenses:', error);
        // Optionally notify user here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      }
      attempts++;
    }
    this.loading = false;
  }

  openModal() {
    this.showModal = true;
    this.newExpenseName = '';
    this.newExpenseAmount = null;
  }

  closeModal() {
    this.showModal = false;
  }

  async loadExpensesForMonth() {
    this.loading = true;
    this.expenses = await this.expenseService.loadExpenses(this.selectedMonth);
    this.loading = false;
  }

  async onMonthChange() {
    await this.loadExpensesForMonth();
  }

  async addExpense() {
    if (this.newExpenseName && this.newExpenseAmount !== null) {
      const expense = { name: this.newExpenseName, amount: this.newExpenseAmount, month: this.selectedMonth };
      await this.expenseService.addExpense(expense);
      await this.loadExpensesForMonth();
      this.closeModal();
    }
  }

  async removeExpense(expense: Expense) {
    this.loading = true;
    await this.expenseService.removeExpense(expense);
    await this.loadExpensesForMonth();
    this.loading = false;
  }

  getBudgetSummary() {
    const spent = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      totalBudget: this.totalBudget,
      spent,
      remaining: this.totalBudget - spent
    };
  }
}
