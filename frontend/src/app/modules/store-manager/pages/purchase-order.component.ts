import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, 
    MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatChipsModule
  ],
  template: `
    <div class="po-container">
      <header class="page-header">
        <div class="title-group">
          <h1>Purchase Orders</h1>
          <p>Procure stock from suppliers and track order status</p>
        </div>
        <button mat-raised-button color="primary" class="new-order-btn" (click)="toggleForm()">
          <mat-icon>{{ showForm ? 'close' : 'add' }}</mat-icon> {{ showForm ? 'Cancel' : 'New Order' }}
        </button>
      </header>

      <!-- Dynamic Summary Cards -->
      <div class="summary-grid">
        <mat-card class="summary-card active">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Active Orders</span>
              <h2 class="value">{{ summary.activeCount }}</h2>
            </div>
            <mat-icon class="card-icon text-primary">local_shipping</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card pending">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Pending Approval</span>
              <h2 class="value text-warn">{{ summary.pendingCount }}</h2>
            </div>
            <mat-icon class="card-icon text-warn">hourglass_empty</mat-icon>
          </div>
        </mat-card>

        <mat-card class="summary-card completed">
          <div class="card-content">
            <div class="card-info">
              <span class="label">Completed Orders</span>
              <h2 class="value text-success">{{ summary.completedCount }}</h2>
            </div>
            <mat-icon class="card-icon text-success">task_alt</mat-icon>
          </div>
        </mat-card>
      </div>

      <!-- Create Order Form -->
      <mat-card *ngIf="showForm" class="form-card animated fadeIn">
        <mat-card-header>
          <mat-card-title>Create New Purchase Order</mat-card-title>
        </mat-card-header>
        <form (submit)="createOrder()" #poForm="ngForm" class="po-form">
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Supplier Name</mat-label>
              <mat-select [(ngModel)]="newOrder.supplierId" name="supplierId" required>
                <mat-option *ngFor="let s of suppliers" [value]="s.id">{{ s.name }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Product</mat-label>
              <mat-select [(ngModel)]="newOrder.productId" name="productId" required>
                <mat-option *ngFor="let p of products" [value]="p.id">{{ p.name }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Quantity</mat-label>
              <input matInput type="number" [(ngModel)]="newOrder.quantity" name="quantity" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Unit Price (₹)</mat-label>
              <input matInput type="number" [(ngModel)]="newOrder.unitPrice" name="unitPrice" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Delivery Date</mat-label>
              <input matInput type="date" [(ngModel)]="newOrder.deliveryDate" name="deliveryDate" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="newOrder.status" name="status" required>
                <mat-option value="PENDING">Pending</mat-option>
                <mat-option value="APPROVED">Approved</mat-option>
                <mat-option value="DRAFT">Save Draft</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="form-actions">
            <button mat-stroked-button type="button" (click)="saveDraft()">Save Draft</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="!poForm.valid">Create Order</button>
          </div>
        </form>
      </mat-card>

      <!-- Orders Table -->
      <mat-card class="table-card">
        <div class="table-container">
          <table mat-table [dataSource]="orders" class="custom-table">
            <ng-container matColumnDef="orderId">
              <th mat-header-cell *matHeaderCellDef> Order ID </th>
              <td mat-cell *matCellDef="let po"> {{ po.orderNumber }} </td>
            </ng-container>

            <ng-container matColumnDef="supplier">
              <th mat-header-cell *matHeaderCellDef> Supplier </th>
              <td mat-cell *matCellDef="let po"> {{ po.supplierName }} </td>
            </ng-container>

            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef> Product </th>
              <td mat-cell *matCellDef="let po"> {{ po.productName }} </td>
            </ng-container>

            <ng-container matColumnDef="quantity">
              <th mat-header-cell *matHeaderCellDef> Qty </th>
              <td mat-cell *matCellDef="let po"> {{ po.quantity }} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let po">
                <span class="status-chip" [ngClass]="po.status.toLowerCase()">{{ po.status }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef> Order Date </th>
              <td mat-cell *matCellDef="let po"> {{ po.orderDate | date:'mediumDate' }} </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let po">
                <button mat-icon-button (click)="viewOrder(po)"><mat-icon>visibility</mat-icon></button>
                <button mat-icon-button color="primary" (click)="editOrder(po)"><mat-icon>edit</mat-icon></button>
                <button mat-icon-button color="warn" (click)="deleteOrder(po.id)"><mat-icon>delete</mat-icon></button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .po-container { padding: 30px; background: #f8fafc; min-height: 100vh; }
    .page-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 25px; }
    .title-group h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
    .new-order-btn { height: 48px; border-radius: 12px; font-weight: 600; padding: 0 24px; }

    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 25px 0; }
    .summary-card { border-radius: 16px; border: none; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
    .card-content { display: flex; justify-content: space-between; align-items: center; padding: 24px; }
    .label { font-size: 0.85rem; font-weight: 500; color: #64748b; text-transform: uppercase; }
    .value { font-size: 1.8rem; font-weight: 700; color: #1e293b; margin: 8px 0 0 0; }
    .card-icon { font-size: 36px; width: 36px; height: 36px; opacity: 0.6; }
    
    .text-primary { color: #3b82f6 !important; }
    .text-warn { color: #f59e0b !important; }
    .text-success { color: #22c55e !important; }

    .form-card { margin-bottom: 30px; border-radius: 16px; border: none; }
    .po-form { padding: 20px; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px; }

    .table-card { border-radius: 16px; border: none; overflow: hidden; }
    .custom-table { width: 100%; }
    th { background: #f1f5f9; padding: 16px; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 0.75rem; }
    td { padding: 16px; font-size: 0.9rem; }

    .status-chip { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
    .pending { background: #fef3c7; color: #92400e; }
    .approved { background: #dcfce7; color: #166534; }
    .delivered { background: #eff6ff; color: #1d4ed8; }
    .cancelled { background: #fee2e2; color: #991b1b; }

    .animated { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class PurchaseOrderComponent implements OnInit {
  private http = inject(HttpClient);
  
  summary: any = { activeCount: 0, pendingCount: 0, completedCount: 0 };
  orders: any[] = [];
  suppliers: any[] = [];
  products: any[] = [];
  displayedColumns = ['orderId', 'supplier', 'product', 'quantity', 'status', 'date', 'actions'];

  showForm = false;
  newOrder: any = { status: 'PENDING' };

  ngOnInit() {
    this.loadData();
    this.loadLookups();
  }

  loadData() {
    this.http.get<any[]>('/api/purchase-orders').subscribe(data => {
      this.orders = data;
      this.calculateSummary();
    });
  }

  loadLookups() {
    this.http.get<any[]>('/api/suppliers').subscribe(data => this.suppliers = data);
    this.http.get<any[]>('/api/products').subscribe(data => this.products = data);
  }

  calculateSummary() {
    this.summary.activeCount = this.orders.filter(o => o.status === 'APPROVED' || o.status === 'SHIPPED').length;
    this.summary.pendingCount = this.orders.filter(o => o.status === 'PENDING').length;
    this.summary.completedCount = this.orders.filter(o => o.status === 'DELIVERED').length;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.newOrder = { status: 'PENDING' };
  }

  createOrder() {
    this.http.post('/api/purchase-orders', this.newOrder).subscribe(() => {
      this.loadData();
      this.showForm = false;
    });
  }

  saveDraft() {
    this.newOrder.status = 'DRAFT';
    this.createOrder();
  }

  viewOrder(po: any) { console.log('View', po); }
  editOrder(po: any) { this.newOrder = { ...po }; this.showForm = true; }
  deleteOrder(id: number) {
    if (confirm('Delete this order?')) {
      this.http.delete(`/api/purchase-orders/${id}`).subscribe(() => this.loadData());
    }
  }
}
