import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, 
    MatCardModule, MatTabsModule, MatDividerModule, MatDialogModule
  ],
  template: `
    <div class="inventory-container">
      <header class="page-header">
        <h1>Inventory Control</h1>
        <p>Monitor stock availability and movement history</p>
      </header>

      <!-- Top Summary Cards -->
      <div class="summary-grid">
        <mat-card class="summary-card">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Total Items</span>
              <h2 class="value">{{ summary.totalItems }}</h2>
            </div>
            <mat-icon class="card-icon">apps</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card available">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Available Stock</span>
              <h2 class="value text-success">{{ summary.availableStock }}</h2>
            </div>
            <mat-icon class="card-icon text-success">check_circle</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card low">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Low Stock Items</span>
              <h2 class="value text-warn">{{ summary.lowStockCount }}</h2>
            </div>
            <mat-icon class="card-icon text-warn">feedback</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card out">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Out of Stock</span>
              <h2 class="value text-danger">{{ summary.outOfStockCount }}</h2>
            </div>
            <mat-icon class="card-icon text-danger">cancel</mat-icon>
          </div>
        </mat-card>
      </div>

      <mat-tab-group class="inventory-tabs">
        <!-- Stock Table -->
        <mat-tab label="Stock Overview">
          <mat-card class="tab-card">
            <div class="table-container">
              <table mat-table [dataSource]="inventory" class="custom-table">
                <ng-container matColumnDef="product">
                  <th mat-header-cell *matHeaderCellDef> Product </th>
                  <td mat-cell *matCellDef="let item" class="clickable" (click)="viewProductDetails(item)"> 
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-sku">{{ item.sku }}</div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="category">
                  <th mat-header-cell *matHeaderCellDef> Category </th>
                  <td mat-cell *matCellDef="let item"> {{ item.category }} </td>
                </ng-container>

                <ng-container matColumnDef="quantity">
                  <th mat-header-cell *matHeaderCellDef> Quantity </th>
                  <td mat-cell *matCellDef="let item"> 
                    <span class="qty-pill">{{ item.quantity }}</span> 
                  </td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef> Status </th>
                  <td mat-cell *matCellDef="let item">
                    <span class="status-badge" [ngClass]="item.status.toLowerCase()">{{ item.status }}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="updated">
                  <th mat-header-cell *matHeaderCellDef> Last Updated </th>
                  <td mat-cell *matCellDef="let item"> {{ item.updatedAt | date:'mediumDate' }} </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let item">
                    <button mat-icon-button color="primary" class="stock-btn add" (click)="updateStock(item, 'ADD')">
                      <mat-icon>add_circle_outline</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" class="stock-btn remove" (click)="updateStock(item, 'REMOVE')">
                      <mat-icon>remove_circle_outline</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="inventoryColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: inventoryColumns;"></tr>
              </table>
            </div>
          </mat-card>
        </mat-tab>

        <!-- Movement History -->
        <mat-tab label="Stock Movement History">
          <mat-card class="tab-card">
            <div class="table-container">
              <table mat-table [dataSource]="history" class="custom-table">
                <ng-container matColumnDef="product">
                  <th mat-header-cell *matHeaderCellDef> Product </th>
                  <td mat-cell *matCellDef="let h"> {{ h.productName }} </td>
                </ng-container>

                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef> Date </th>
                  <td mat-cell *matCellDef="let h"> {{ h.createdAt | date:'short' }} </td>
                </ng-container>

                <ng-container matColumnDef="quantity">
                  <th mat-header-cell *matHeaderCellDef> Qty Changed </th>
                  <td mat-cell *matCellDef="let h" [style.color]="h.type === 'ADDED' ? '#22c55e' : '#ef4444'"> 
                    {{ h.type === 'ADDED' ? '+' : '-' }}{{ h.quantityChanged }}
                  </td>
                </ng-container>

                <ng-container matColumnDef="action">
                  <th mat-header-cell *matHeaderCellDef> Action Type </th>
                  <td mat-cell *matCellDef="let h">
                    <span class="type-pill" [ngClass]="h.type.toLowerCase()">{{ h.type }}</span>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="historyColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: historyColumns;"></tr>
              </table>
            </div>
          </mat-card>
        </mat-tab>
      </mat-tab-group>

      <!-- Product Details Modal (Overlay) -->
      <div *ngIf="selectedItem" class="details-overlay" (click)="closeDetails()">
        <mat-card class="details-card" (click)="$event.stopPropagation()">
          <div class="details-header">
            <h3>Product Details</h3>
            <button mat-icon-button (click)="closeDetails()"><mat-icon>close</mat-icon></button>
          </div>
          <mat-divider></mat-divider>
          <div class="details-body">
            <div class="product-visual">
              <mat-icon class="huge-icon">image</mat-icon>
            </div>
            <div class="details-info">
              <div class="info-row"><span class="label">Name:</span> <span class="val">{{ selectedItem.productName }}</span></div>
              <div class="info-row"><span class="label">SKU:</span> <span class="val">{{ selectedItem.sku }}</span></div>
              <div class="info-row"><span class="label">Quantity:</span> <span class="val qty-val">{{ selectedItem.quantity }}</span></div>
              <div class="info-row"><span class="label">Price:</span> <span class="val">₹{{ selectedItem.price }}</span></div>
              <div class="info-row"><span class="label">Supplier:</span> <span class="val">{{ selectedItem.supplier || 'N/A' }}</span></div>
              <div class="info-row"><span class="label">Last Updated:</span> <span class="val">{{ selectedItem.updatedAt | date:'medium' }}</span></div>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .inventory-container { padding: 30px; background: #f8fafc; min-height: 100vh; }
    .page-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
    .page-header p { color: #64748b; margin-top: 4px; }

    .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin: 25px 0; }
    .summary-card { border-radius: 16px; border: none; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    .card-content { display: flex; justify-content: space-between; align-items: center; padding: 24px; }
    .label { font-size: 0.85rem; font-weight: 500; color: #64748b; text-transform: uppercase; }
    .value { font-size: 1.8rem; font-weight: 700; color: #1e293b; margin: 8px 0 0 0; }
    .card-icon { font-size: 36px; width: 36px; height: 36px; opacity: 0.6; }
    
    .text-success { color: #22c55e !important; }
    .text-warn { color: #f59e0b !important; }
    .text-danger { color: #ef4444 !important; }

    .inventory-tabs { margin-top: 20px; }
    .tab-card { border-radius: 0 0 16px 16px; border: none; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); }
    
    .custom-table { width: 100%; }
    th { background: #f1f5f9; padding: 16px; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 0.75rem; }
    td { padding: 16px; font-size: 0.9rem; }
    
    .clickable { cursor: pointer; }
    .clickable:hover .p-name { color: #3b82f6; text-decoration: underline; }
    .p-name { font-weight: 600; color: #1e293b; }
    .p-sku { font-size: 0.75rem; color: #64748b; }

    .qty-pill { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-weight: 600; }
    
    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; }
    .available { background: #dcfce7; color: #166534; }
    .low_stock { background: #fff8e1; color: #ff8f00; }
    .out_of_stock { background: #fee2e2; color: #991b1b; }
    
    .type-pill { padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; }
    .added { background: #dcfce7; color: #166534; }
    .removed { background: #fee2e2; color: #991b1b; }
    .updated { background: #eff6ff; color: #1d4ed8; }

    .details-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
    .details-card { width: 100%; max-width: 500px; border-radius: 20px; padding: 20px; }
    .details-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .details-header h3 { margin: 0; font-weight: 800; color: #1e293b; }
    .details-body { display: flex; gap: 20px; padding-top: 20px; }
    .product-visual { width: 150px; height: 150px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .huge-icon { font-size: 64px; width: 64px; height: 64px; color: #cbd5e1; }
    .details-info { flex: 1; }
    .info-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .info-row .label { color: #64748b; font-weight: 400; text-transform: none; }
    .info-row .val { font-weight: 600; color: #1e293b; }
    .qty-val { color: #3b82f6; font-size: 1.1rem; }
  `]
})
export class InventoryComponent implements OnInit {
  private http = inject(HttpClient);
  
  summary: any = { totalItems: 0, availableStock: 0, lowStockCount: 0, outOfStockCount: 0 };
  inventory: any[] = [];
  history: any[] = [];
  selectedItem: any = null;

  inventoryColumns = ['product', 'category', 'quantity', 'status', 'updated', 'actions'];
  historyColumns = ['product', 'date', 'quantity', 'action'];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('/api/inventory').subscribe(data => {
      this.inventory = data;
      this.calculateSummary();
    });
    this.http.get<any[]>('/api/inventory/history').subscribe(data => this.history = data);
  }

  calculateSummary() {
    this.summary.totalItems = this.inventory.length;
    this.summary.availableStock = this.inventory.reduce((sum, item) => sum + item.quantity, 0);
    this.summary.lowStockCount = this.inventory.filter(i => i.status === 'LOW_STOCK').length;
    this.summary.outOfStockCount = this.inventory.filter(i => i.quantity <= 0).length;
  }

  updateStock(item: any, type: string) {
    const amount = parseInt(prompt(`Enter amount to ${type.toLowerCase()}:`, '10') || '0');
    if (amount > 0) {
      this.http.post(`/api/inventory/update/${item.id}`, { type, amount }).subscribe(() => this.loadData());
    }
  }

  viewProductDetails(item: any) {
    this.selectedItem = item;
  }

  closeDetails() {
    this.selectedItem = null;
  }
}
