import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { WarehouseService, WarehouseDashboardStats } from '../services/warehouse.service';

import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatSnackBarModule],
  template: `
    <div class="dashboard-wrap">
      <header class="page-header">
        <div class="title">
          <h1>Warehouse Overview</h1>
          <p>Real-time status of stock and operations</p>
        </div>
        <div class="header-actions">
          <button mat-flat-button color="primary" (click)="ngOnInit()">
            <mat-icon>refresh</mat-icon> Sync Data
          </button>
        </div>
      </header>

      <div class="stats-grid">
        <mat-card class="stat-card blue">
          <div class="card-inner">
            <div class="info">
              <span class="label">Total Received</span>
              <h2 class="val">{{ stats?.totalProductsReceived || 0 }}</h2>
            </div>
            <mat-icon class="icon">inbox</mat-icon>
          </div>
        </mat-card>

        <mat-card class="stat-card teal">
          <div class="card-inner">
            <div class="info">
              <span class="label">Current Stock</span>
              <h2 class="val">{{ stats?.currentStockAvailable || 0 }}</h2>
            </div>
            <mat-icon class="icon">inventory_2</mat-icon>
          </div>
        </mat-card>

        <mat-card class="stat-card amber">
          <div class="card-inner">
            <div class="info">
              <span class="label">Low Stock items</span>
              <h2 class="val danger">{{ stats?.lowStockProducts || 0 }}</h2>
            </div>
            <mat-icon class="icon danger">report_problem</mat-icon>
          </div>
        </mat-card>

        <mat-card class="stat-card purple">
          <div class="card-inner">
            <div class="info">
              <span class="label">Today Dispatched</span>
              <h2 class="val">{{ stats?.todayDispatches || 0 }}</h2>
            </div>
            <mat-icon class="icon">local_shipping</mat-icon>
          </div>
        </mat-card>
      </div>

      <div class="main-sections">
        <mat-card class="notifications-card">
          <mat-card-header>
            <mat-card-title>Operations Log</mat-card-title>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content class="note-list">
            <div *ngFor="let n of stats?.notifications" class="note-item">
              <div class="note-icon" [ngClass]="n.type?.toLowerCase()">
                <mat-icon>{{ getNoteIcon(n.type) }}</mat-icon>
              </div>
              <div class="note-text">
                <div class="note-title">{{ n.title }}</div>
                <div class="note-desc">{{ n.message }}</div>
                <div class="note-time">{{ n.createdAt | date:'shortTime' }}</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="quick-actions">
          <mat-card-header>
            <mat-card-title>Quick Actions</mat-card-title>
          </mat-card-header>
          <mat-card-content class="actions-grid">
            <button mat-stroked-button class="action-btn" (click)="router.navigate(['/warehouse/stock-receipt'])">
              <mat-icon>add_shopping_cart</mat-icon> New Receipt
            </button>
            <button mat-stroked-button class="action-btn" (click)="router.navigate(['/warehouse/inventory-updates'])">
              <mat-icon>edit_note</mat-icon> Update Stock
            </button>
            <button mat-stroked-button class="action-btn" (click)="quickAction('SCAN')">
              <mat-icon>qr_code_scanner</mat-icon> Scan Item
            </button>
            <button mat-stroked-button class="action-btn" (click)="quickAction('LABELS')">
              <mat-icon>print</mat-icon> Labels
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrap { display: flex; flex-direction: column; gap: 30px; }
    .page-header { display: flex; justify-content: space-between; align-items: start; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.5px; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .stat-card { border-radius: 24px; border: none; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .stat-card:hover { transform: translateY(-8px); }
    .card-inner { display: flex; justify-content: space-between; align-items: center; padding: 28px; }
    .label { font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
    .val { font-size: 2.25rem; font-weight: 800; color: #0f172a; margin: 10px 0 0 0; }
    .icon { font-size: 44px; width: 44px; height: 44px; color: #0ea5e9; opacity: 0.5; }
    
    .danger { color: #ef4444 !important; }

    .main-sections { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
    .notifications-card, .quick-actions { border-radius: 24px; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .note-list { padding: 15px 0; max-height: 500px; overflow-y: auto; }
    .note-item { display: flex; gap: 20px; padding: 18px 24px; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; cursor: pointer; }
    .note-item:hover { background: #f8fafc; }
    .note-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #f1f5f9; color: #64748b; }
    .note-icon.info { background: #e0f2fe; color: #0ea5e9; }
    .note-icon.low_stock { background: #fff7ed; color: #f97316; }
    
    .note-title { font-weight: 700; color: #1e293b; font-size: 1rem; }
    .note-desc { font-size: 0.875rem; color: #64748b; margin: 4px 0; }
    .note-time { font-size: 0.75rem; color: #94a3b8; }

    .actions-grid { display: grid; grid-template-columns: 1fr; gap: 15px; padding: 20px !important; }
    .action-btn { height: 56px; border-radius: 16px; font-weight: 600; text-align: left; padding: 0 20px !important; border: 1px solid #e2e8f0 !important; color: #334155 !important; }
    .action-btn mat-icon { margin-right: 12px; color: #0ea5e9; }
  `]
})
export class WarehouseDashboardComponent implements OnInit {
  private warehouseService = inject(WarehouseService);
  public router = inject(Router);
  private snack = inject(MatSnackBar);
  stats: WarehouseDashboardStats | null = null;

  ngOnInit() {
    this.warehouseService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }

  quickAction(type: string) {
    if (type === 'SCAN') {
      this.snack.open('Initializing Camera Scanner...', 'Close', { duration: 3000 });
      setTimeout(() => this.router.navigate(['/warehouse/stock-receipt']), 1500);
    } else if (type === 'LABELS') {
      this.snack.open('Generating Barcode Labels for current batch...', 'Print', { duration: 4000 });
    }
  }

  getNoteIcon(type: string): string {
    if (!type) return 'notifications';
    switch (type.toUpperCase()) {
      case 'LOW_STOCK': return 'warning';
      case 'DISPATCH': return 'local_shipping';
      case 'RECEIPT': return 'input';
      default: return 'notifications';
    }
  }
}
