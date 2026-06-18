import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-count',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule, FormsModule],
  template: `
    <div class="count-container">
      <header class="page-header">
        <h1>Stock Count & Audit</h1>
        <p>Perform physical verification of inventory stock</p>
      </header>

      <div class="summary-cards">
        <mat-card class="summary-card">
          <span class="label">Counted Items</span>
          <h2 class="val">85 / 120</h2>
        </mat-card>
        <mat-card class="summary-card mismatch">
          <span class="label">Mismatches Found</span>
          <h2 class="val">3</h2>
        </mat-card>
        <mat-card class="summary-card">
          <span class="label">Audit Status</span>
          <h2 class="val text-primary">In Progress</h2>
        </mat-card>
      </div>

      <mat-card class="audit-card">
        <mat-card-header>
          <mat-card-title>Current Audit Session: Monthly Inventory Check</mat-card-title>
        </mat-card-header>
        <div class="table-wrap">
          <table mat-table [dataSource]="auditItems">
            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef> Product </th>
              <td mat-cell *matCellDef="let item"> 
                <div class="p-name">{{ item.name }}</div>
                <div class="p-sku">{{ item.sku }}</div>
              </td>
            </ng-container>

            <ng-container matColumnDef="system">
              <th mat-header-cell *matHeaderCellDef> System Qty </th>
              <td mat-cell *matCellDef="let item"> 
                <span class="qty-pill sys">{{ item.systemQty }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="physical">
              <th mat-header-cell *matHeaderCellDef> Physical Qty </th>
              <td mat-cell *matCellDef="let item">
                <input type="number" [(ngModel)]="item.physicalQty" class="qty-input">
              </td>
            </ng-container>

            <ng-container matColumnDef="difference">
              <th mat-header-cell *matHeaderCellDef> Difference </th>
              <td mat-cell *matCellDef="let item">
                <span class="diff-badge" [ngClass]="getDiffClass(item)">
                  {{ item.physicalQty - item.systemQty }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let item">
                <span class="status-pill" [ngClass]="getStatusClass(item)">
                  {{ getStatusText(item) }}
                </span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
        <mat-divider></mat-divider>
        <div class="card-footer">
          <button mat-button color="warn">Discard Session</button>
          <button mat-flat-button color="primary">Finalize & Update Inventory</button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .count-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .summary-card { border-radius: 20px; border: none; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .summary-card .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
    .summary-card .val { font-size: 1.75rem; font-weight: 800; margin: 8px 0 0 0; color: #0f172a; }
    .mismatch .val { color: #ef4444; }
    .text-primary { color: #0ea5e9 !important; }

    .audit-card { border-radius: 24px; border: none; overflow: hidden; padding-bottom: 0; }
    .table-wrap { padding: 20px; }
    table { width: 100%; }
    th { color: #64748b; font-weight: 700; font-size: 0.75rem; background: #f8fafc; }
    td { height: 70px; border-bottom: 1px solid #f1f5f9; }

    .p-name { font-weight: 700; color: #1e293b; }
    .p-sku { font-size: 0.75rem; color: #94a3b8; }

    .qty-pill { padding: 4px 10px; border-radius: 8px; font-weight: 700; }
    .qty-pill.sys { background: #f1f5f9; color: #64748b; }
    
    .qty-input { width: 70px; padding: 8px 12px; border: 2px solid #e2e8f0; border-radius: 10px; font-weight: 700; outline: none; transition: border-color 0.2s; }
    .qty-input:focus { border-color: #0ea5e9; }

    .diff-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; }
    .diff-zero { background: #f1f5f9; color: #94a3b8; }
    .diff-pos { background: #dcfce7; color: #15803d; }
    .diff-neg { background: #fee2e2; color: #ef4444; }

    .status-pill { padding: 4px 12px; border-radius: 30px; font-size: 0.75rem; font-weight: 700; }
    .correct { background: #dcfce7; color: #15803d; }
    .mismatch { background: #fff7ed; color: #c2410c; }

    .card-footer { padding: 25px; display: flex; justify-content: flex-end; gap: 15px; }
  `]
})
export class WarehouseStockCountComponent {
  displayedColumns = ['product', 'system', 'physical', 'difference', 'status'];

  auditItems = [
    { name: 'Office Desk Chair', sku: 'FUR-9902', systemQty: 45, physicalQty: 45 },
    { name: 'Mechanical Keyboard GL', sku: 'ELE-2210', systemQty: 120, physicalQty: 122 },
    { name: 'Power Strip 6-way', sku: 'ELE-0044', systemQty: 88, physicalQty: 85 },
    { name: 'Filing Cabinet Steel', sku: 'OFF-1102', systemQty: 12, physicalQty: 12 },
  ];

  getDiffClass(item: any) {
    const diff = item.physicalQty - item.systemQty;
    if (diff === 0) return 'diff-zero';
    return diff > 0 ? 'diff-pos' : 'diff-neg';
  }

  getStatusClass(item: any) {
    return item.physicalQty === item.systemQty ? 'correct' : 'mismatch';
  }

  getStatusText(item: any) {
    return item.physicalQty === item.systemQty ? 'VERIFIED' : 'MISMATCH';
  }
}
