import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupplierService, SupplierDashboardStats } from '../services/supplier.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatTableModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Supplier Dashboard</h1>
        <div class="header-actions">
          <button mat-flat-button color="primary" (click)="router.navigate(['/supplier/confirm-eta'])">
            <mat-icon>event</mat-icon> Update ETA
          </button>
        </div>
      </header>

      <!-- Top Summary Cards -->
      <div class="summary-grid">
        <mat-card class="summary-card assigned">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Total Assigned</span>
              <h2 class="value">{{ stats?.assignedOrders || 0 }}</h2>
            </div>
            <mat-icon class="card-icon">assignment</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card pending">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Pending Confirmation</span>
              <h2 class="value text-warn">{{ stats?.pendingDeliveries || 0 }}</h2>
            </div>
            <mat-icon class="card-icon text-warn">hourglass_empty</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card completed">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Fulfillment Rate</span>
              <h2 class="value text-success">94%</h2>
            </div>
            <mat-icon class="card-icon text-success">verified</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card revenue">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Business Volume</span>
              <h2 class="value">₹{{ 245800 | number }}</h2>
            </div>
            <mat-icon class="card-icon text-info">payments</mat-icon>
          </div>
        </mat-card>
      </div>

      <div class="main-grid">
        <!-- New Orders Panel -->
        <mat-card class="panel orders-panel">
          <mat-card-header>
            <mat-card-title>Recent Order Requests</mat-card-title>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content class="panel-content">
            <div *ngFor="let po of recentActivities" class="order-item">
              <div class="order-id">#{{ po.poId }}</div>
              <div class="order-details">
                <span class="p-name">{{ po.product }}</span>
                <span class="p-date">Assigned recently</span>
              </div>
              <span class="status-chip" [ngClass]="po.status.toLowerCase()">{{ po.status }}</span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Visualization -->
        <mat-card class="panel charts-panel">
          <mat-card-header>
            <mat-card-title>Delivery Performance (On-Time)</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <div class="mock-chart">
                <div class="bar" style="height: 85%" title="Day 1: 85%"></div>
                <div class="bar" style="height: 60%" title="Day 2: 60%"></div>
                <div class="bar" style="height: 90%" title="Day 3: 90%"></div>
                <div class="bar" style="height: 75%" title="Day 4: 75%"></div>
                <div class="bar" style="height: 95%" title="Day 5: 95%"></div>
                <div class="bar" style="height: 80%" title="Day 6: 80%"></div>
                <div class="bar" style="height: 88%" title="Day 7: 88%"></div>
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
    .text-info { color: #0ea5e9 !important; }

    .main-grid { display: grid; grid-template-columns: 400px 1fr; gap: 25px; }
    @media (max-width: 1000px) { .main-grid { grid-template-columns: 1fr; } }
    
    .panel { border-radius: 16px; border: none; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); }
    .panel-content { padding: 10px 0; }
    
    .order-item { display: flex; align-items: center; gap: 15px; padding: 15px 20px; border-bottom: 1px solid #f1f5f9; }
    .order-id { font-weight: 800; color: #3b82f6; font-size: 0.9rem; min-width: 80px; }
    .order-details { flex: 1; display: flex; flex-direction: column; }
    .p-name { font-weight: 600; color: #1e293b; font-size: 0.9rem; }
    .p-date { font-size: 0.75rem; color: #94a3b8; }
    
    .status-chip { padding: 4px 10px; border-radius: 20px; font-size: 0.65rem; font-weight: 800; }
    .status-chip.pending { background: #fffbeb; color: #f59e0b; }
    .status-chip.confirmed { background: #e0f2fe; color: #0ea5e9; }
    .status-chip.delivered { background: #f0fdf4; color: #22c55e; }

    .chart-container { height: 300px; padding: 20px; }
    .mock-chart { height: 100%; display: flex; align-items: flex-end; gap: 12px; border-left: 2px solid #e2e8f0; border-bottom: 2px solid #e2e8f0; padding: 10px; }
    .bar { flex: 1; background: #3b82f6; border-radius: 6px 6px 0 0; min-width: 25px; transition: all 0.3s; }
    .bar:hover { background: #2563eb; transform: scaleY(1.05); }
  `]
})
export class SupplierDashboardComponent implements OnInit {
  private service = inject(SupplierService);
  private storage = inject(StorageService);
  public router = inject(Router);

  stats: SupplierDashboardStats | null = null;
  recentActivities = [
    { poId: 'PO-1045', product: 'Wireless Audio Kit', status: 'PENDING' },
    { poId: 'PO-1042', product: 'Monitor Arm', status: 'CONFIRMED' },
    { poId: 'PO-1038', product: 'Mechanical Keyboard', status: 'DELIVERED' }
  ];

  ngOnInit() {
    const user = this.storage.getUser();
    if (user && user.id) {
      this.service.getDashboardStats(user.id).subscribe(data => {
        this.stats = data;
      });
    }
  }
}
