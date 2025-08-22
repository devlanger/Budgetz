export enum RecurringType {
  None = 0,
  Monthly = 1,
  Yearly = 2
}

export enum ExpenseType {
  Expense = 0,
  Income = 1
}

export interface Expense {
  id?: number;
  name: string;
  amount: number;
  month: string;
  category: string;
  recurring?: RecurringType;
  type: ExpenseType;
}