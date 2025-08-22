import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-component.html',
  styleUrls: ['./chart-component.scss']
})
export class ChartsComponent implements OnChanges {
  @Input() categoryStats: { category: string; amount: number }[] = [];

  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6c757d'
        ]
      }
    ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    this.pieChartLabels = this.categoryStats.map(s => s.category);
    this.pieChartData.labels = this.pieChartLabels;
    this.pieChartData.datasets[0].data = this.categoryStats.map(s => s.amount);
  }
}
