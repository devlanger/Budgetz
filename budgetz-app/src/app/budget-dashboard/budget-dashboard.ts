import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalExpenseService } from '../services/local-expense.service';
import { ApiExpenseService } from '../services/api-expense.service';
import { Expense, ExpenseType, RecurringType } from '../models/Expense';
import { StatisticsComponent } from "../statistics-component/statistics-component";
import { ChartsComponent } from "../chart-component/chart-component";

@Component({
  selector: 'app-budget-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StatisticsComponent, ChartsComponent],
  templateUrl: './budget-dashboard.html',
  styleUrl: './budget-dashboard.scss'
})
export class BudgetDashboard implements OnInit {
  selectedMonth = new Date().toISOString().slice(0, 7);
  expenses: Expense[] = [];
  totalBudget = 10000;
  showModal = false;
  newExpenseName = '';
  newExpenseAmount: number | null = null;
  newExpenseCategory = 'Other';
  newExpenseRecurring: RecurringType = RecurringType.None;
  categories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Transport', 'Other'];
  recurringTypes = [
    { value: RecurringType.None, label: 'None' },
    { value: RecurringType.Monthly, label: 'Monthly' },
    { value: RecurringType.Yearly, label: 'Yearly' }
  ];
  loading = false;
  RecurringType = RecurringType;
  ExpenseType = ExpenseType;
  newExpenseType: ExpenseType = ExpenseType.Expense;
  showEditModal = false;
  editExpense: Expense | null = null;

  constructor(private expenseService: ApiExpenseService) { }

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
    this.newExpenseType = ExpenseType.Expense;
    this.newExpenseName = '';
    this.newExpenseAmount = null;
    this.newExpenseCategory = 'Other';
    this.newExpenseRecurring = RecurringType.None;
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
    if (this.newExpenseName && this.newExpenseAmount !== null && this.newExpenseCategory) {
      const expense: Expense = {
        name: this.newExpenseName,
        amount: this.newExpenseAmount,
        month: this.selectedMonth,
        category: this.newExpenseCategory,
        recurring: this.newExpenseRecurring,
        type: this.newExpenseType
      };
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

  openEditModal(expense: Expense) {
    this.editExpense = { ...expense }; // clone to avoid direct mutation
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editExpense = null;
  }

  async saveEditExpense() {
    if (this.editExpense) {
      await this.expenseService.updateExpense(this.editExpense);
      await this.loadExpensesForMonth();
      this.closeEditModal();
    }
  }

  getBudgetSummary() {
    const income = this.expenses
      .filter(e => e.type === ExpenseType.Income)
      .reduce((sum, e) => sum + e.amount, 0);
    const expenses = this.expenses
      .filter(e => e.type === ExpenseType.Expense)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      income,
      expenses,
      remaining: income - expenses
    };
  }

  getMonthlyStats() {
    const stats: { category: string; amount: number; percent: number }[] = [];
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7); // "YYYY-MM"
    const expensesOnly = this.expenses.filter(
      e => e.type === ExpenseType.Expense && e.month === currentMonth
    );
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

  getRecurringLabel(value: RecurringType): string {
    const type = this.recurringTypes.find(t => t.value === value);
    return type ? type.label : '';
  }

  changeMonth(offset: number) {
    const [year, month] = this.selectedMonth.split('-').map(Number);
    // Create a date object for the first day of the current month
    const date = new Date(year, month - 1, 1);
    // Add offset months
    date.setMonth(date.getMonth() + offset);
    // Format back to YYYY-MM
    const newMonth = date.getFullYear().toString().padStart(4, '0') + '-' +
      (date.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth = newMonth;
    this.onMonthChange();
  }
}
