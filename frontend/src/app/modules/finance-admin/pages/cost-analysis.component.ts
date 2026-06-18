import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-cost-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cost-analysis">
      <h1 class="page-title">Cost Analysis & Budgeting</h1>

      <div class="stats-row">
        <div class="kpi-card">
          <span class="label">Monthly Budget</span>
          <span class="value">₹ {{ formatPrice(budget?.monthlyBudget) }}</span>
          <div class="progress-container">
            <div class="progress-bar" [style.width]="budgetPercent + '%'"></div>
          </div>
          <span class="meta">{{budgetPercent}}% utilized</span>
        </div>
        <div class="kpi-card">
          <span class="label">Used Budget</span>
          <span class="value purple">₹ {{ formatPrice(budget?.usedBudget) }}</span>
          <span class="meta success">+5% efficiency</span>
        </div>
        <div class="kpi-card">
          <span class="label">Remaining</span>
          <span class="value teal">₹ {{ formatPrice(budget?.remainingBudget) }}</span>
          <span class="meta text-teal">Ready for allocation</span>
        </div>
        <div class="kpi-card">
          <span class="label">Cost Savings</span>
          <span class="value yellow">₹ 4,50,000</span>
          <span class="meta">Year to date</span>
        </div>
      </div>

      <div class="analysis-grid">
        <div class="chart-box">
          <h3>Spending by Category</h3>
          <div class="category-list">
            <div class="category-item" *ngFor="let cat of categories | keyvalue">
              <div class="cat-info">
                <span>{{cat.key}}</span>
                <span>₹ {{formatPrice($any(cat.value))}}</span>
              </div>
              <div class="cat-bar-container">
                <div class="cat-bar" [style.width]="getCatPercent(cat.value) + '%'"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="analysis-details">
          <h3>Expense Breakdown</h3>
          <div class="expense-list">
            <div class="expense-item" *ngFor="let expense of expenses">
              <div class="dot" [style.background]="getCategoryColor(expense.category)"></div>
              <div class="exp-main">
                <p class="exp-title">{{expense.description}}</p>
                <small>{{expense.expenseDate | date}}</small>
              </div>
              <span class="exp-amount">₹ {{formatPrice(expense.amount)}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cost-analysis { display: flex; flex-direction: column; gap: 35px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #1e293b; }

    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; }
    .kpi-card { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .kpi-card .label { color: #64748b; font-size: 0.9rem; display: block; margin-bottom: 10px; }
    .kpi-card .value { font-size: 1.6rem; font-weight: 800; color: #0f172a; display: block; margin-bottom: 15px; }
    .kpi-card .value.purple { color: #722ed1; }
    .kpi-card .value.teal { color: #13c2c2; }
    .kpi-card .value.yellow { color: #faad14; }
    
    .progress-container { height: 6px; background: #f1f5f9; border-radius: 10px; margin-bottom: 8px; }
    .progress-bar { height: 100%; background: #00d2ff; border-radius: 10px; }
    .meta { font-size: 0.8rem; color: #94a3b8; }
    .meta.success { color: #10b981; font-weight: 600; }

    .analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
    .chart-box, .analysis-details { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .chart-box h3, .analysis-details h3 { margin-bottom: 25px; color: #1e293b; }

    .category-list { display: flex; flex-direction: column; gap: 20px; }
    .cat-info { display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; }
    .cat-bar-container { height: 8px; background: #f1f5f9; border-radius: 4px; }
    .cat-bar { height: 100%; background: #00d2ff; border-radius: 4px; }

    .expense-list { display: flex; flex-direction: column; gap: 15px; }
    .expense-item { display: flex; align-items: center; gap: 15px; padding: 12px; border-radius: 10px; background: #f8fafc; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .exp-main { flex: 1; }
    .exp-title { font-weight: 600; margin: 0; font-size: 0.9rem; }
    .exp-amount { font-weight: 700; color: #1e293b; }
  `]
})
export class CostAnalysisComponent implements OnInit {
  budget: any;
  categories: any = {};
  expenses: any[] = [];
  budgetPercent = 0;

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.financeService.getBudget().subscribe(data => {
      this.budget = data;
      if (this.budget) {
        this.budgetPercent = Math.round((this.budget.usedBudget / this.budget.monthlyBudget) * 100);
      }
    });

    this.financeService.getCategorySpending().subscribe(data => this.categories = data);
    
    // Simulate expenses for view
    this.expenses = [
      { description: 'Server Maintenance Charges', category: 'Logistics', amount: 45000, expenseDate: new Date() },
      { description: 'Bulk Furniture Purchase', category: 'Electronics', amount: 125000, expenseDate: new Date() },
      { description: 'Warehouse Security Upgrade', category: 'Warehouse', amount: 80000, expenseDate: new Date() }
    ];
  }

  formatPrice(value: any): string {
    return (value || 0).toLocaleString('en-IN');
  }

  getCatPercent(value: any): number {
    const total = Object.values(this.categories).reduce((a: any, b: any) => a + b, 0) as number;
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  getCategoryColor(cat: string): string {
    const colors: any = {
      'Electronics': '#1890ff',
      'Logistics': '#52c41a',
      'Warehouse': '#faad14',
      'Supplier Charges': '#ff4d4f'
    };
    return colors[cat] || '#8c8c8c';
  }
}
