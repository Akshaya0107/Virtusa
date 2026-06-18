import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SupplierService } from '../services/supplier.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-view-purchase-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="orders-container">
      <header class="page-header">
        <h1>Assigned Purchase Orders</h1>
        <p>Review and confirm orders from SupplySync Store Manager</p>
      </header>

      <mat-card class="table-card">
        <div class="table-wrap">
          <table mat-table [dataSource]="orders">
            <ng-container matColumnDef="orderNumber">
              <th mat-header-cell *matHeaderCellDef> PO Number </th>
              <td mat-cell *matCellDef="let po"> <span class="po-no">#{{po.orderNumber}}</span> </td>
            </ng-container>

            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef> Product Details </th>
              <td mat-cell *matCellDef="let po">
                <div class="p-info">
                  <span class="name">{{po.items?.[0]?.product?.name || 'Multiple Items'}}</span>
                  <span class="quant">Qty: {{po.items?.[0]?.quantity || 0}}</span>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="totalAmount">
              <th mat-header-cell *matHeaderCellDef> Amount </th>
              <td mat-cell *matCellDef="let po"> ₹{{po.totalAmount | number}} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let po"> 
                <span class="badge" [ngClass]="po.status.toLowerCase()">{{po.status}}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let po">
                <button mat-flat-button color="primary" *ngIf="po.status === 'PENDING'" (click)="updateStatus(po.id, 'CONFIRMED')">
                  Confirm
                </button>
                <button mat-stroked-button (click)="viewDetails(po)" class="ml-2">
                  Details
                </button>
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
    .orders-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .table-card { border-radius: 24px; border: none; overflow: hidden; }
    .table-wrap { padding: 10px; }
    table { width: 100%; }
    th { height: 60px; color: #64748b; font-weight: 700; background: #f8fafc; }
    td { height: 75px; border-bottom: 1px solid #f1f5f9; }

    .po-no { font-weight: 700; color: #0ea5e9; font-family: 'Roboto Mono', monospace; }
    .p-info { display: flex; flex-direction: column; }
    .p-info .name { font-weight: 700; color: #1e293b; }
    .p-info .quant { font-size: 0.75rem; color: #64748b; }

    .badge { padding: 5px 12px; border-radius: 30px; font-size: 0.75rem; font-weight: 700; }
    .pending { background: #fee2e2; color: #ef4444; }
    .confirmed { background: #e0f2fe; color: #0ea5e9; }
    .shipped { background: #fef9c3; color: #a16207; }
    .delivered { background: #dcfce7; color: #15803d; }
    .ml-2 { margin-left: 10px; }
  `]
})
export class ViewPurchaseOrdersComponent implements OnInit {
  private service = inject(SupplierService);
  private storage = inject(StorageService);
  private dialog = inject(MatDialog);

  orders: any[] = [];
  displayedColumns = ['orderNumber', 'product', 'totalAmount', 'status', 'actions'];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const user = this.storage.getUser();
    if (user && user.id) {
      this.service.getPurchaseOrders(user.id).subscribe(data => {
        this.orders = data;
      });
    }
  }

  updateStatus(id: number, status: string) {
    this.service.updateOrderStatus(id, status).subscribe(() => {
      this.loadOrders();
    });
  }

  viewDetails(po: any) {
    // Implement details dialog
  }
}
