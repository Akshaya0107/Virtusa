import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-finance-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1 class="page-title">Finance Overview</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon pending">⏳</div>
          <div class="stat-info">
            <span class="label">Pending PO Approvals</span>
            <span class="value">{{stats.pendingApprovals || 0}}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon approved">✅</div>
          <div class="stat-info">
            <span class="label">Approved POs</span>
            <span class="value">{{stats.approvedPurchaseOrders || 0}}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon cost">₹</div>
          <div class="stat-info">
            <span class="label">Total Procurement Cost</span>
            <span class="value">₹ {{ formatPrice(stats.totalProcurementCost) }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon monthly">📅</div>
          <div class="stat-info">
            <span class="label">Monthly Spend</span>
            <span class="value">₹ {{ formatPrice(stats.monthlySpend) }}</span>
          </div>
        </div>
      </div>

      <div class="analytics-row">
        <div class="chart-container">
          <h3>Purchase Order Trends</h3>
          <div class="placeholder-chart">
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 80%"></div>
            <div class="bar" style="height: 40%"></div>
            <div class="bar" style="height: 90%"></div>
            <div class="bar" style="height: 50%"></div>
            <div class="bar" style="height: 70%"></div>
          </div>
          <div class="chart-labels">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        <div class="activity-table">
          <div class="table-header">
            <h3>Recent Financial Activities</h3>
            <button class="btn-link">View All</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>PO ID</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let po of recentPOs">
                <td>#{{po.orderNumber}}</td>
                <td>{{po.supplier.name}}</td>
                <td>₹ {{formatPrice(po.totalAmount)}}</td>
                <td><span class="badge" [ngClass]="po.status.toLowerCase()">{{po.status}}</span></td>
                <td><button class="btn-sm">Review</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { display: flex; flex-direction: column; gap: 30px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #1a202c; }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 25px;
    }
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      transition: transform 0.2s;
    }
    .stat-card:hover { transform: translateY(-5px); }
    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    .pending { background: #fffbe6; color: #faad14; }
    .approved { background: #f6ffed; color: #52c41a; }
    .cost { background: #e6f7ff; color: #1890ff; }
    .monthly { background: #f9f0ff; color: #722ed1; }
    
    .stat-info .label { color: #718096; font-size: 0.9rem; display: block; margin-bottom: 5px; }
    .stat-info .value { font-size: 1.4rem; font-weight: 700; color: #2d3748; }

    .analytics-row {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 30px;
    }
    .chart-container, .activity-table {
      background: white;
      padding: 25px;
      border-radius: 16px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .placeholder-chart {
      height: 200px;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      padding: 20px 0;
      border-bottom: 2px solid #edf2f7;
    }
    .bar { width: 30px; background: #00d2ff; border-radius: 5px 5px 0 0; }
    .chart-labels { display: flex; justify-content: space-around; padding-top: 10px; color: #a0aec0; font-size: 0.8rem; }

    .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .btn-link { background: none; border: none; color: #00d2ff; font-weight: 600; cursor: pointer; }
    
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px; color: #718096; border-bottom: 1px solid #edf2f7; font-weight: 600; }
    td { padding: 15px 12px; border-bottom: 1px solid #f7fafc; color: #2d3748; }
    
    .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .badge.pending { background: #fffbe6; color: #faad14; }
    .badge.approved { background: #f6ffed; color: #52c41a; }
    .badge.rejected { background: #fff1f0; color: #f5222d; }
    
    .btn-sm { padding: 6px 12px; border-radius: 6px; border: 1px solid #00d2ff; color: #00d2ff; background: white; cursor: pointer; font-size: 0.8rem; transition: 0.2s; }
    .btn-sm:hover { background: #00d2ff; color: white; }
  `]
})
export class FinanceDashboardComponent implements OnInit {
  stats: any = {};
  recentPOs: any[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.financeService.getDashboardStats().subscribe(data => this.stats = data);
    this.financeService.getPurchaseOrders().subscribe(data => this.recentPOs = data.slice(0, 5));
  }

  formatPrice(value: number): string {
    return (value || 0).toLocaleString('en-IN');
  }
}
