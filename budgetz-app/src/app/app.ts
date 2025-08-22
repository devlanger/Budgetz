import { Component, signal } from '@angular/core';
import { BudgetDashboard } from "./budget-dashboard/budget-dashboard";
import { NavbarComponent } from "./nav-component/nav-component";
import { StatisticsPageComponent } from "./statistics-page/statistics-page";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [BudgetDashboard, NavbarComponent, StatisticsPageComponent, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('budgetz-app');
  page: 'dashboard' | 'statistics' = 'dashboard';

  setPage(page: string) {
    this.page = page as any;
  }
}
