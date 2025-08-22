import { Expense } from "../models/Expense";

export abstract class ExpenseService {
  abstract loadExpenses(month: string): Promise<Expense[]>;
  abstract loadExpensesByYear(year: string): Promise<Expense[]>;
  abstract addExpense(expense: Expense): Promise<void>;
  abstract removeExpense(expense: Expense): Promise<void>;
  abstract updateExpense(expense: Expense): Promise<void>;
}