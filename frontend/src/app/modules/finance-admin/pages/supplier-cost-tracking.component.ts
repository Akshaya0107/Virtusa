import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-supplier-tracking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="supplier-tracking">
      <h1 class="page-title">Supplier Cost Analysis</h1>

      <div class="top-cards">
        <div class="track-card">
          <span class="label">Total Suppliers</span>
          <span class="value">24</span>
        </div>
        <div class="track-card">
          <span class="label">High Cost Suppliers</span>
          <span class="value red">3</span>
        </div>
        <div class="track-card">
          <span class="label">Average Payment Lag</span>
          <span class="value teal">4 Days</span>
        </div>
        <div class="track-card">
          <span class="label">Cost Efficient Suppliers</span>
          <span class="value green">18</span>
        </div>
      </div>

      <div class="supplier-table-card">
        <h3>Supplier Spending & Performance</h3>
        <table>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Total Purchase Cost</th>
              <th>Last Transaction</th>
              <th>Payment Status</th>
              <th>Efficiency</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of suppliers">
              <td><strong>{{s.supplier.name}}</strong></td>
              <td>₹ {{formatPrice(s.totalPurchaseCost)}}</td>
              <td>{{s.lastTransactionDate | date:'mediumDate'}}</td>
              <td><span class="badge paid">PAID</span></td>
              <td>
                <div class="efficiency-bar">
                  <div class="fill" style="width: 85%"></div>
                </div>
              </td>
              <td class="trend-up">▲ 12%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="payments-section">
        <h3>Recent Supplier Payments</h3>
        <div class="payment-grid">
          <div class="payment-card" *ngFor="let p of payments">
            <div class="p-header">
              <span class="txn">{{p.transactionReference}}</span>
              <span class="p-status paid">PAID</span>
            </div>
            <div class="p-body">
              <h4>{{p.supplier.name}}</h4>
              <p class="amount">₹ {{formatPrice(p.amount)}}</p>
              <small>{{p.paymentDate | date:'medium'}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .supplier-tracking { display: flex; flex-direction: column; gap: 35px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #1e293b; }

    .top-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; }
    .track-card { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .track-card .label { color: #64748b; font-size: 0.85rem; display: block; margin-bottom: 8px; }
    .track-card .value { font-size: 1.5rem; font-weight: 800; color: #0f172a; }
    .track-card .value.red { color: #ef4444; }
    .track-card .value.teal { color: #008080; }
    .track-card .value.green { color: #10b981; }

    .supplier-table-card { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .supplier-table-card h3 { margin-bottom: 25px; }
    
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 15px; color: #64748b; border-bottom: 1px solid #f1f5f9; }
    td { padding: 18px 15px; border-bottom: 1px solid #f8fafc; font-size: 0.95rem; }
    
    .badge.paid { background: #f0fdf4; color: #15803d; font-weight: 600; font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; }
    .trend-up { color: #10b981; font-weight: 700; }
    
    .efficiency-bar { height: 6px; width: 100px; background: #f1f5f9; border-radius: 3px; }
    .efficiency-bar .fill { height: 100%; background: #10b981; border-radius: 3px; }

    .payments-section h3 { margin-bottom: 20px; }
    .payment-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .payment-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
    .p-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
    .p-header .txn { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
    .p-body h4 { margin: 0 0 10px 0; font-size: 1.1rem; }
    .p-body .amount { color: #00d2ff; font-size: 1.3rem; font-weight: 800; margin: 0; }
    .p-body small { color: #94a3b8; }
  `]
})
export class SupplierTrackingComponent implements OnInit {
  suppliers: any[] = [];
  payments: any[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.financeService.getSupplierCosts().subscribe(data => this.suppliers = data.slice(0, 10));
    this.financeService.getSupplierPayments().subscribe(data => this.payments = data.slice(0, 6));
  }

  formatPrice(value: number): string {
    return (value || 0).toLocaleString('en-IN');
  }
}
