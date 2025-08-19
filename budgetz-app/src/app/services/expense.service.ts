export interface Expense {
  id?: number;
  name: string;
  amount: number;
  month: string;
}

export abstract class ExpenseService {
  abstract loadExpenses(month: string): Promise<Expense[]>;
  abstract addExpense(expense: Expense): Promise<void>;
  abstract removeExpense(expense: Expense): Promise<void>;
}