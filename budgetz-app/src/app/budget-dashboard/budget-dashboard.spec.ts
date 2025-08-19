import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDashboard } from './budget-dashboard';

describe('BudgetDashboard', () => {
  let component: BudgetDashboard;
  let fixture: ComponentFixture<BudgetDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
