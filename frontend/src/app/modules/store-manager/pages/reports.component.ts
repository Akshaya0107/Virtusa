import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="reports-container">
      <header class="page-header">
        <h1>Reports & Analysis</h1>
        <p>Generate and export business intelligence reports from SupplySync.</p>
      </header>

      <div class="report-grid">
        <mat-card class="report-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>category</mat-icon>
            <mat-card-title>Product Report</mat-card-title>
            <mat-card-subtitle>Full catalog with pricing and details</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-flat-button color="primary" (click)="generateReport('products')">
              <mat-icon>download</mat-icon> Export PDF
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="report-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>inventory</mat-icon>
            <mat-card-title>Inventory Report</mat-card-title>
            <mat-card-subtitle>Stock levels and valuation</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-flat-button color="primary" (click)="generateReport('inventory')">
              <mat-icon>download</mat-icon> Export PDF
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="report-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>receipt_long</mat-icon>
            <mat-card-title>Purchase Order Report</mat-card-title>
            <mat-card-subtitle>Historical procurement analysis</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-flat-button color="primary" (click)="generateReport('orders')">
              <mat-icon>download</mat-icon> Export PDF
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="report-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>trending_up</mat-icon>
            <mat-card-title>Sales Report</mat-card-title>
            <mat-card-subtitle>Revenue and volume metrics</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-flat-button color="primary" (click)="generateReport('sales')">
              <mat-icon>download</mat-icon> Export PDF
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .reports-container { padding: 30px; }
    .page-header { margin-bottom: 30px; }
    .report-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .report-card { border-radius: 12px; padding: 10px; transition: box-shadow 0.3s; }
    .report-card:hover { box-shadow: 0 8px 15px rgba(0,0,0,0.1); }
    mat-icon[mat-card-avatar] { background: #edf2f7; color: #4a5568; padding: 8px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
  `]
})
export class ReportsComponent {
  private http = inject(HttpClient);

  generateReport(type: string) {
    this.http.post(`/api/reports/generate/${type}`, {}, { responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_report.pdf`;
      a.click();
    });
  }
}

