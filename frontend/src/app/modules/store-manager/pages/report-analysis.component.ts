import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-analysis',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, 
    MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatSelectModule, FormsModule
  ],
  template: `
    <div class="report-container">
      <header class="page-header">
        <h1>Report & Analysis</h1>
        <p>Generate detailed PDF reports and analyze store performance</p>
      </header>

      <div class="report-grid">
        <!-- Report Generators -->
        <mat-card class="generator-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>assessment</mat-icon>
            <mat-card-title>Generate Reports</mat-card-title>
            <mat-card-subtitle>Select report type and date range</mat-card-subtitle>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div class="filter-section">
              <mat-form-field appearance="outline">
                <mat-label>Predefined Range</mat-label>
                <mat-select [(ngModel)]="filters.range">
                  <mat-option value="daily">Daily</mat-option>
                  <mat-option value="weekly">Weekly</mat-option>
                  <mat-option value="monthly">Monthly</mat-option>
                  <mat-option value="custom">Custom Range</mat-option>
                </mat-select>
              </mat-form-field>

              <div *ngIf="filters.range === 'custom'" class="date-picker-group">
                <mat-form-field appearance="outline">
                  <mat-label>Start Date</mat-label>
                  <input matInput [matDatepicker]="startPicker" [(ngModel)]="filters.start">
                  <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                  <mat-datepicker #startPicker></mat-datepicker>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>End Date</mat-label>
                  <input matInput [matDatepicker]="endPicker" [(ngModel)]="filters.end">
                  <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                  <mat-datepicker #endPicker></mat-datepicker>
                </mat-form-field>
              </div>
            </div>

            <div class="report-buttons">
              <button mat-flat-button color="primary" (click)="generatePDF('product')" [disabled]="loading">
                <mat-icon>inventory</mat-icon> Generate Product Report PDF
              </button>
              <button mat-flat-button color="primary" (click)="generatePDF('inventory')" [disabled]="loading">
                <mat-icon>warehouse</mat-icon> Generate Inventory Report PDF
              </button>
              <button mat-flat-button color="primary" (click)="generatePDF('order')" [disabled]="loading">
                <mat-icon>shopping_bag</mat-icon> Generate Purchase Order Report PDF
              </button>
              <button mat-flat-button color="accent" (click)="generatePDF('sales')" [disabled]="loading">
                <mat-icon>trending_up</mat-icon> Generate Sales Report PDF
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Analysis Section -->
        <mat-card class="analysis-card">
          <mat-card-header>
            <mat-card-title>Performance Insights</mat-card-title>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div class="insight-item">
              <div class="insight-row">
                <span>Sales Performance</span>
                <span class="pct positive">+12.5%</span>
              </div>
              <div class="progress-bar"><div class="fill" style="width: 75%"></div></div>
            </div>

            <div class="insight-item">
              <div class="insight-row">
                <span>Inventory Turnover</span>
                <span class="pct positive">+5.2%</span>
              </div>
              <div class="progress-bar"><div class="fill" style="width: 60%"></div></div>
            </div>

            <div class="insight-item">
              <div class="insight-row">
                <span>Out of Stock Rate</span>
                <span class="pct negative">-2.1%</span>
              </div>
              <div class="progress-bar"><div class="fill danger" style="width: 15%"></div></div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .report-container { padding: 30px; background: #f8fafc; min-height: 100vh; }
    .page-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
    .page-header p { color: #64748b; margin-top: 4px; }

    .report-grid { display: grid; grid-template-columns: 1fr 350px; gap: 30px; margin-top: 30px; }
    @media (max-width: 1000px) { .report-grid { grid-template-columns: 1fr; } }

    .generator-card, .analysis-card { border-radius: 20px; border: none; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    
    mat-card-content { padding: 30px !important; }
    
    .filter-section { display: flex; gap: 20px; margin-bottom: 30px; align-items: center; }
    .date-picker-group { display: flex; gap: 10px; }

    .report-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .report-buttons button { height: 60px; border-radius: 12px; font-weight: 600; font-size: 0.9rem; }

    .insight-item { margin-bottom: 25px; }
    .insight-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 600; color: #334155; }
    .pct { font-size: 0.8rem; padding: 2px 8px; border-radius: 4px; }
    .positive { background: #dcfce7; color: #166534; }
    .negative { background: #fee2e2; color: #991b1b; }

    .progress-bar { height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }
    .fill { height: 100%; background: #3b82f6; border-radius: 4px; transition: width 1s ease-in-out; }
    .fill.danger { background: #ef4444; }
  `]
})
export class ReportAnalysisComponent {
  private http = inject(HttpClient);
  
  filters: any = { range: 'monthly', start: null, end: null };
  loading = false;

  generatePDF(type: string) {
    this.loading = true;
    this.http.post(`/api/reports/generate/${type}`, {}, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${type}_report_${new Date().getTime()}.pdf`;
        link.click();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error generating PDF', err);
        this.loading = false;
        alert('Failed to generate report. Ensure JasperReports is configured on backend.');
      }
    });
  }
}
