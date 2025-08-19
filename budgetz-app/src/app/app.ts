import { Component, signal } from '@angular/core';
import { BudgetDashboard } from "./budget-dashboard/budget-dashboard";

@Component({
  selector: 'app-root',
  imports: [BudgetDashboard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('budgetz-app');
}
