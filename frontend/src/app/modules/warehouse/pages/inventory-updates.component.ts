import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { WarehouseService } from '../services/warehouse.service';

@Component({
  selector: 'app-inventory-updates',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatDividerModule, MatChipsModule],
  template: `
    <div class="inventory-container">
      <header class="page-header">
        <h1>Inventory Control</h1>
        <p>Monitor real-time stock levels and update quantities</p>
      </header>

      <div class="stats-summary">
        <mat-card class="mini-card">
          <span class="label">Total SKUs</span>
          <h3 class="val">{{ inventory.length }}</h3>
        </mat-card>
        <mat-card class="mini-card low-stock">
          <span class="label">Low Stock items</span>
          <h3 class="val">{{ lowStockCount }}</h3>
        </mat-card>
        <mat-card class="mini-card">
          <span class="label">Out of Stock</span>
          <h3 class="val">{{ outOfStockCount }}</h3>
        </mat-card>
      </div>

      <mat-card class="table-card">
        <div class="table-header">
          <div class="search-box">
            <mat-icon>search</mat-icon>
            <input type="text" placeholder="Filter by product name, SKU or category">
          </div>
          <button mat-flat-button color="accent" (click)="exportToCSV()">
            <mat-icon>file_download</mat-icon> Export CSV
          </button>
        </div>

        <div class="table-wrap">
          <table mat-table [dataSource]="inventory">
            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef> Product Details </th>
              <td mat-cell *matCellDef="let item">
                <div class="product-info">
                  <div class="p-name">{{ item.productName }}</div>
                  <div class="p-sku">{{ item.sku }}</div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef> Category </th>
              <td mat-cell *matCellDef="let item"> {{ item.category }} </td>
            </ng-container>

            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef> Stock Quantity </th>
              <td mat-cell *matCellDef="let item"> 
                <span class="qty-badge" [class.danger]="item.quantity <= item.minThreshold">
                  {{ item.quantity }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="location">
              <th mat-header-cell *matHeaderCellDef> Storage Location </th>
              <td mat-cell *matCellDef="let item"> 
                <mat-chip-set>
                  <mat-chip highlighted color="primary">{{ item.location }}</mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let item">
                <span class="status-indicator" [ngClass]="item.status.toLowerCase()">
                  {{ item.status }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let item">
                <button mat-icon-button (click)="viewDetails(item)"><mat-icon>visibility</mat-icon></button>
                <button mat-icon-button color="primary"><mat-icon>edit_square</mat-icon></button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </mat-card>

      <!-- Details Drawer (Mock as simple card for now) -->
      <mat-card *ngIf="selectedItem" class="details-drawer animated slideInUp">
        <div class="drawer-header">
          <h3>Product Statistics: {{ selectedItem.productName }}</h3>
          <button mat-icon-button (click)="selectedItem = null"><mat-icon>close</mat-icon></button>
        </div>
        <mat-divider></mat-divider>
        <div class="drawer-content">
          <div class="detail-item">
            <span class="label">Minimum Threshold:</span>
            <span class="val">{{ selectedItem.minThreshold }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Last Updated:</span>
            <span class="val">{{ selectedItem.updatedAt | date:'medium' }}</span>
          </div>
          <!-- Stock History Timeline could go here -->
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .inventory-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .stats-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .mini-card { border-radius: 20px; border: none; padding: 20px 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .mini-card .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .mini-card .val { font-size: 1.75rem; font-weight: 800; margin: 8px 0 0 0; color: #0f172a; }
    .low-stock .val { color: #f97316; }

    .table-card { border-radius: 24px; border: none; overflow: hidden; }
    .table-header { display: flex; justify-content: space-between; align-items: center; padding: 25px; border-bottom: 1px solid #f1f5f9; }
    .search-box { display: flex; align-items: center; background: #f8fafc; padding: 10px 20px; border-radius: 12px; width: 400px; border: 1px solid #e2e8f0; }
    .search-box input { border: none; background: transparent; outline: none; margin-left: 12px; font-size: 0.9rem; width: 100%; }

    .table-wrap { padding: 10px; overflow-x: auto; }
    table { width: 100%; }
    th { height: 60px; color: #64748b; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; background: #f8fafc; }
    td { height: 75px; border-bottom: 1px solid #f8fafc; }
    
    .product-info .p-name { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
    .product-info .p-sku { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }

    .qty-badge { background: #f1f5f9; color: #1e293b; padding: 6px 12px; border-radius: 10px; font-weight: 800; font-size: 0.9rem; }
    .qty-badge.danger { background: #fee2e2; color: #ef4444; }

    .status-indicator { padding: 5px 12px; border-radius: 30px; font-size: 0.75rem; font-weight: 700; }
    .status-indicator.available { background: #dcfce7; color: #15803d; }
    .status-indicator.low_stock { background: #fff7ed; color: #c2410c; }
    .status-indicator.out_of_stock { background: #fef2f2; color: #dc2626; }

    .details-drawer { position: fixed; bottom: 30px; right: 30px; width: 400px; z-index: 1000; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); }
    .drawer-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; }
    .drawer-header h3 { margin: 0; font-weight: 800; color: #1e293b; }
    .drawer-content { padding: 25px; display: flex; flex-direction: column; gap: 15px; }
    .detail-item { display: flex; justify-content: space-between; }
    .detail-item .label { color: #64748b; font-weight: 500; }
    .detail-item .val { font-weight: 700; color: #0f172a; }

    .animated { animation-duration: 0.5s; animation-fill-mode: both; }
    @keyframes slideInUp { from { transform: translate3d(0, 100%, 0); opacity: 0; } to { transform: translate3d(0, 0, 0); opacity: 1; } }
    .slideInUp { animation-name: slideInUp; }
  `]
})
export class WarehouseInventoryUpdatesComponent implements OnInit {
  private warehouseService = inject(WarehouseService);
  inventory: any[] = [];
  displayedColumns = ['product', 'category', 'quantity', 'location', 'status', 'actions'];
  selectedItem: any = null;

  lowStockCount = 0;
  outOfStockCount = 0;

  ngOnInit() {
    this.warehouseService.getInventory().subscribe(data => {
      this.inventory = data.map(i => ({
        ...i,
        sku: i.productSku, // DTO has productSku
        status: i.quantity <= 0 ? 'OUT_OF_STOCK' : (i.quantity <= i.minThreshold ? 'LOW_STOCK' : 'AVAILABLE')
      }));
      this.calculateStats();
    });
  }

  exportToCSV() {
    const headers = ['Product', 'SKU', 'Category', 'Quantity', 'Location', 'Status'];
    const rows = this.inventory.map(i => [
      i.productName,
      i.sku,
      i.category,
      i.quantity,
      i.location,
      i.status
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inventory_report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  calculateStats() {
    this.lowStockCount = this.inventory.filter(i => i.status === 'LOW_STOCK').length;
    this.outOfStockCount = this.inventory.filter(i => i.status === 'OUT_OF_STOCK').length;
  }

  viewDetails(item: any) {
    this.selectedItem = item;
  }
}
