import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, MatDividerModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Store Performance Overview</h1>
        <div class="header-actions">
          <button mat-button [matMenuTriggerFor]="periodMenu">
            <mat-icon>calendar_today</mat-icon> {{ selectedPeriod }}
          </button>
          <mat-menu #periodMenu="matMenu">
            <button mat-menu-item (click)="setPeriod('Last 10 Days')">Last 10 Days</button>
            <button mat-menu-item (click)="setPeriod('Last 30 Days')">Last 30 Days</button>
          </mat-menu>
        </div>
      </header>

      <!-- Top Summary Cards -->
      <div class="summary-grid">
        <mat-card class="summary-card products">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Total Products</span>
              <h2 class="value">{{ summary.totalProducts }}</h2>
            </div>
            <mat-icon class="card-icon">inventory_2</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card stock">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Inventory Stock</span>
              <h2 class="value">{{ summary.totalStock }}</h2>
            </div>
            <mat-icon class="card-icon">warehouse</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card low-stock">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Low Stock</span>
              <h2 class="value text-warn">{{ summary.lowStockCount }}</h2>
            </div>
            <mat-icon class="card-icon text-warn">warning</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card sales">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Total Sales</span>
              <h2 class="value">₹{{ summary.totalSales | number }}</h2>
            </div>
            <mat-icon class="card-icon text-success">payments</mat-icon>
          </div>
        </mat-card>
      </div>

      <div class="main-grid">
        <!-- Notifications Panel -->
        <mat-card class="notifications-panel">
          <mat-card-header>
            <mat-card-title>Notifications</mat-card-title>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content class="panel-content">
            <div *ngFor="let note of notifications" class="notification-item" [ngClass]="note.type.toLowerCase()">
              <div class="note-icon">
                <mat-icon>{{ getNoteIcon(note.type) }}</mat-icon>
              </div>
              <div class="note-body">
                <div class="note-title">{{ note.title }}</div>
                <div class="note-message">{{ note.message }}</div>
                <div class="note-time">{{ note.timeAgo }}</div>
              </div>
            </div>
            <div *ngIf="notifications.length === 0" class="empty-state">No new notifications</div>
          </mat-card-content>
        </mat-card>

        <!-- Visualization -->
        <mat-card class="charts-panel">
          <mat-card-header>
            <mat-card-title>Sales Trend (₹)</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <!-- Placeholder for Chart -->
              <div class="mock-chart">
                <div *ngFor="let s of salesTrend" 
                     class="bar" 
                     [style.height.%]="s.percentage"
                     [attr.title]="s.date + ': ₹' + s.amount">
                  <span class="bar-label">{{ s.date | date:'dd' }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Activities -->
        <mat-card class="activities-panel">
          <mat-card-header>
            <mat-card-title>Recent Activities</mat-card-title>
          </mat-card-header>
          <mat-card-content class="panel-content">
            <div *ngFor="let act of activities" class="activity-item">
              <div class="activity-marker"></div>
              <div class="activity-details">
                <span class="activity-text">{{ act.details }}</span>
                <span class="activity-time">{{ act.timeAgo }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 30px; background: #f8fafc; min-height: 100vh; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .dashboard-header h1 { font-size: 1.75rem; color: #1e293b; font-weight: 700; margin: 0; }
    
    .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .summary-card { border-radius: 16px; border: none; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); transition: transform 0.2s; }
    .summary-card:hover { transform: translateY(-4px); }
    .card-content { display: flex; justify-content: space-between; align-items: center; padding: 24px; }
    .card-info .label { font-size: 0.875rem; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .card-info .value { font-size: 1.875rem; font-weight: 700; color: #1e293b; margin: 8px 0 0 0; }
    .card-icon { font-size: 40px; width: 40px; height: 40px; opacity: 0.8; color: #3b82f6; }
    .text-warn { color: #f59e0b !important; }
    .text-success { color: #22c55e !important; }

    .main-grid { display: grid; grid-template-columns: 350px 1fr 300px; gap: 25px; align-items: start; }
    @media (max-width: 1200px) { .main-grid { grid-template-columns: 1fr; } }
    
    .notifications-panel, .charts-panel, .activities-panel { border-radius: 16px; border: none; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); }
    .panel-content { padding: 15px 0; max-height: 400px; overflow-y: auto; }
    
    .notification-item { display: flex; gap: 15px; padding: 12px 20px; border-bottom: 1px solid #f1f5f9; cursor: pointer; transition: background 0.2s; }
    .notification-item:hover { background: #f8fafc; }
    .note-icon { width: 40px; height: 40px; min-width: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #eff6ff; color: #3b82f6; }
    .note-title { font-weight: 600; color: #1e293b; font-size: 0.95rem; }
    .note-message { font-size: 0.85rem; color: #64748b; margin: 2px 0; }
    .note-time { font-size: 0.75rem; color: #94a3b8; }
    
    .low_stock .note-icon { background: #fffbeb; color: #f59e0b; }
    .delayed .note-icon { background: #fef2f2; color: #ef4444; }
    .success .note-icon { background: #f0fdf4; color: #22c55e; }

    .chart-container { height: 300px; padding: 20px 0; }
    .mock-chart { height: 100%; display: flex; align-items: flex-end; gap: 8px; border-left: 2px solid #e2e8f0; border-bottom: 2px solid #e2e8f0; padding: 10px; }
    .bar { flex: 1; background: #3b82f6; border-radius: 4px 4px 0 0; min-width: 15px; position: relative; transition: all 0.3s; }
    .bar:hover { background: #2563eb; transform: scaleX(1.1); }
    .bar-label { position: absolute; bottom: -22px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b; }

    .activity-item { display: flex; gap: 15px; padding: 12px 20px; }
    .activity-marker { width: 10px; height: 10px; min-width: 10px; margin-top: 6px; border-radius: 50%; border: 2px solid #3b82f6; }
    .activity-text { display: block; font-size: 0.9rem; color: #334155; }
    .activity-time { font-size: 0.75rem; color: #94a3b8; }
  `]
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  selectedPeriod = 'Last 30 Days';
  summary: any = { totalProducts: 0, totalStock: 0, lowStockCount: 0, totalSales: 0 };
  notifications: any[] = [];
  activities: any[] = [];
  salesTrend: any[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.http.get('/api/dashboard/summary').subscribe((res: any) => {
      this.summary = {
        totalProducts: res.totalProducts || 0,
        totalStock: res.totalInventoryItems || 0,
        lowStockCount: res.lowStockCount || 0,
        totalSales: res.monthlyRevenue || 0
      };
      this.notifications = res.recentNotifications || [];
      this.activities = res.recentActivities || [];
      this.salesTrend = this.generateMockTrend();
    });
  }

  setPeriod(period: string) {
    this.selectedPeriod = period;
    // Reload chart data for period
  }

  getNoteIcon(type: string): string {
    switch (type.toUpperCase()) {
      case 'LOW_STOCK': return 'warning';
      case 'NEW_ORDER': return 'shopping_cart';
      case 'DELAYED': return 'schedule';
      case 'SUCCESS': return 'check_circle';
      default: return 'notifications';
    }
  }

  generateMockTrend() {
    const data = [];
    const points = this.selectedPeriod === 'Last 10 Days' ? 10 : 30;
    for (let i = 0; i < points; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (points - i));
      const amount = Math.floor(Math.random() * 50000) + 10000;
      data.push({
        date: date,
        amount: amount,
        percentage: (amount / 60000) * 100
      });
    }
    return data;
  }
}
