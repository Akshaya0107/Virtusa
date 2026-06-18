import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SupplierService } from '../services/supplier.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-delivery-history',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  template: `
    <div class="history-container">
      <header class="page-header">
        <h1>Delivery History</h1>
        <p>Review past fulfillment and shipping records</p>
      </header>

      <div class="stats-mini">
        <mat-card class="m-card">
          <span class="label">Total Delivered</span>
          <h3 class="val">{{ history.length }}</h3>
        </mat-card>
        <mat-card class="m-card">
          <span class="label">On-Time Rate</span>
          <h3 class="val">94%</h3>
        </mat-card>
      </div>

      <mat-card class="table-card">
        <div class="table-wrap">
          <table mat-table [dataSource]="history">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> Record ID </th>
              <td mat-cell *matCellDef="let h"> #ETA-{{h.id}} </td>
            </ng-container>

            <ng-container matColumnDef="po">
              <th mat-header-cell *matHeaderCellDef> PO Number </th>
              <td mat-cell *matCellDef="let h"> #{{h.purchaseOrder?.orderNumber}} </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef> Expected Delivery </th>
              <td mat-cell *matCellDef="let h"> {{h.expectedDeliveryDate | date}} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> ETA Status </th>
              <td mat-cell *matCellDef="let h">
                <span class="badge" [ngClass]="h.status.toLowerCase()">{{h.status}}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="invoice">
              <th mat-header-cell *matHeaderCellDef> Invoice </th>
              <td mat-cell *matCellDef="let h">
                <button mat-icon-button color="primary"><mat-icon>download</mat-icon></button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns;"></tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .history-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .stats-mini { display: flex; gap: 20px; }
    .m-card { padding: 20px 25px; border-radius: 20px; border: none; min-width: 200px; }
    .m-card .label { font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
    .m-card .val { font-size: 1.5rem; font-weight: 800; margin-top: 5px; }

    .table-card { border-radius: 24px; border: none; overflow: hidden; }
    table { width: 100%; }
    th { background: #f8fafc; font-weight: 700; color: #64748b; }

    .badge { padding: 5px 12px; border-radius: 30px; font-size: 0.75rem; font-weight: 700; }
    .on_time { background: #dcfce7; color: #15803d; }
    .delayed { background: #fee2e2; color: #ef4444; }
  `]
})
export class DeliveryHistoryComponent implements OnInit {
  private service = inject(SupplierService);
  private storage = inject(StorageService);

  history: any[] = [];
  columns = ['id', 'po', 'date', 'status', 'invoice'];

  ngOnInit() {
    const user = this.storage.getUser();
    if (user && user.id) {
      this.service.getDeliveryHistory(user.id).subscribe(data => {
        this.history = data;
      });
    }
  }
}
