import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-finance-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-page">
      <h1 class="page-title">Financial Reports</h1>

      <div class="report-generators">
        <div class="gen-card" (click)="generateReport('PROCUREMENT')">
          <div class="gen-icon">📄</div>
          <h3>Procurement Report</h3>
          <p>Detailed log of all purchase orders and approvals.</p>
          <button class="btn-gen">Generate PDF</button>
        </div>
        <div class="gen-card" (click)="generateReport('MONTHLY_EXPENSE')">
          <div class="gen-icon">💰</div>
          <h3>Monthly Expense</h3>
          <p>Spending breakdown by category and department.</p>
          <button class="btn-gen">Generate PDF</button>
        </div>
        <div class="gen-card" (click)="generateReport('SUPPLIER_COST')">
          <div class="gen-icon">🏢</div>
          <h3>Supplier Cost Analysis</h3>
          <p>Performance and cost metrics for all suppliers.</p>
          <button class="btn-gen">Generate PDF</button>
        </div>
        <div class="gen-card" (click)="generateReport('AUDIT')">
          <div class="gen-icon">🛡️</div>
          <h3>Audit Log Report</h3>
          <p>Historical log of all financial activities and changes.</p>
          <button class="btn-gen">Generate PDF</button>
        </div>
      </div>

      <div class="recent-reports">
        <h3>Recent Generated Reports</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Generated Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let report of reports">
                <td>{{report.reportName}}</td>
                <td>{{report.reportType}}</td>
                <td>{{report.generatedDate | date:'medium'}}</td>
                <td><span class="badge completed">{{report.status}}</span></td>
                <td><button class="btn-download" (click)="downloadReport(report)">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-page { display: flex; flex-direction: column; gap: 40px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #2d3748; }

    .report-generators {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }
    .gen-card {
      background: white;
      padding: 30px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #f1f5f9;
    }
    .gen-card:hover { transform: translateY(-8px); border-color: #00d2ff; }
    .gen-icon { font-size: 2.5rem; margin-bottom: 15px; }
    .gen-card h3 { color: #1e293b; margin-bottom: 10px; }
    .gen-card p { color: #64748b; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.5; }
    .btn-gen { 
      background: #00d2ff; color: white; border: none; padding: 10px 25px; border-radius: 8px; font-weight: 600; 
      transition: 0.3s;
    }
    .btn-gen:hover { background: #0093af; }

    .recent-reports { background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .recent-reports h3 { margin-bottom: 25px; color: #1e293b; }
    
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 15px; color: #64748b; border-bottom: 1px solid #f1f5f9; }
    td { padding: 18px 15px; border-bottom: 1px solid #f8fafc; }
    
    .badge.completed { background: #f6ffed; color: #52c41a; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; }
    .btn-download { background: #f1f5f9; border: none; padding: 8px 15px; border-radius: 6px; color: #475569; font-weight: 600; cursor: pointer; }
    .btn-download:hover { background: #e2e8f0; }
  `]
})
export class FinanceReportsComponent implements OnInit {
  reports: any[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.financeService.getReports().subscribe(data => this.reports = data);
  }

  generateReport(type: string) {
    this.financeService.generateReport(type).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type.toLowerCase()}_report.pdf`;
      a.click();
      this.loadReports();
    });
  }

  downloadReport(report: any) {
    alert(`Downloading ${report.reportName}...`);
  }
}
