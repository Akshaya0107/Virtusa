import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WarehouseService, StockReceipt } from '../services/warehouse.service';

@Component({
  selector: 'app-stock-receipt',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatTableModule, MatSnackBarModule
  ],
  template: `
    <div class="receipt-container">
      <header class="page-header">
        <h1>Stock Receipt Entry</h1>
        <p>Record incoming goods and verify quality status</p>
      </header>

      <div class="main-grid">
        <mat-card class="form-card">
          <mat-card-header>
            <mat-card-title>New Arrival Verification</mat-card-title>
          </mat-card-header>
          <form [formGroup]="receiptForm" (ngSubmit)="saveReceipt()" class="receipt-form">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Select Product</mat-label>
                <mat-select formControlName="productId">
                  <mat-option *ngFor="let p of products" [value]="p.id">{{ p.name }} ({{ p.sku }})</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Quantity Received</mat-label>
                <input matInput type="number" formControlName="quantityReceived">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Batch Number</mat-label>
                <input matInput formControlName="batchNumber">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Condition</mat-label>
                <mat-select formControlName="conditionStatus">
                  <mat-option value="GOOD">Good Condition</mat-option>
                  <mat-option value="DAMAGED">Damaged / Reject</mat-option>
                  <mat-option value="PENDING_INSPECTION">Awaiting Inspection</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="qr-section">
              <div class="qr-mock" [class.scanning]="isScanning">
                <mat-icon *ngIf="!isScanning">qr_code_scanner</mat-icon>
                <div *ngIf="isScanning" class="scan-line"></div>
                <span *ngIf="!isScanning">Scan QR for Auto-fill</span>
              </div>
              <button type="button" mat-stroked-button (click)="toggleScan()" class="scan-btn">
                {{ isScanning ? 'Stop Camera' : 'Open QR Scanner' }}
              </button>
              <mat-form-field appearance="outline" class="qr-input">
                <mat-label>QR Code Data</mat-label>
                <input matInput formControlName="qrCode">
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="resetForm()">Clear</button>
              <button mat-flat-button color="primary" type="submit" [disabled]="receiptForm.invalid">Record Receipt</button>
            </div>
          </form>
        </mat-card>

        <mat-card class="recent-card">
          <mat-card-header>
            <mat-card-title>Recent Receipts</mat-card-title>
          </mat-card-header>
          <div class="table-wrap">
            <table mat-table [dataSource]="recentReceipts">
              <ng-container matColumnDef="product">
                <th mat-header-cell *matHeaderCellDef> Product </th>
                <td mat-cell *matCellDef="let r"> {{ r.productName }} </td>
              </ng-container>

              <ng-container matColumnDef="qty">
                <th mat-header-cell *matHeaderCellDef> Qty </th>
                <td mat-cell *matCellDef="let r"> {{ r.quantityReceived }} </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let r">
                  <span class="status-pill" [ngClass]="r.conditionStatus.toLowerCase()">{{ r.conditionStatus }}</span>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="['product', 'qty', 'status']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['product', 'qty', 'status'];"></tr>
              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell empty" colspan="3">No recent entries recorded today.</td>
              </tr>
            </table>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .receipt-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .main-grid { display: grid; grid-template-columns: 1fr 400px; gap: 30px; }
    .form-card, .recent-card { border-radius: 24px; border: none; padding: 15px; }

    .receipt-form { display: flex; flex-direction: column; gap: 15px; padding: 20px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; }

    .qr-section { display: flex; flex-direction: column; align-items: center; background: #f8fafc; padding: 30px; border-radius: 20px; gap: 20px; margin: 10px 0; border: 2px dashed #e2e8f0; }
    .qr-mock { width: 140px; height: 140px; background: white; border-radius: 16px; border: 2px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; font-size: 0.75rem; gap: 10px; position: relative; overflow: hidden; }
    .qr-mock mat-icon { font-size: 48px; width: 48px; height: 48px; }
    .scan-btn { border-radius: 12px; font-weight: 600; width: 100%; max-width: 200px; }
    .qr-input { width: 100%; margin-bottom: -15px; }

    .scanning { border-color: #0ea5e9; }
    .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: #0ea5e9; box-shadow: 0 0 10px #0ea5e9; animation: scan 2s infinite ease-in-out; }
    @keyframes scan { 0%, 100% { top: 10%; } 50% { top: 90%; } }

    .table-wrap { padding: 10px; }
    table { width: 100%; }
    th { color: #94a3b8; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; }
    td { font-size: 0.875rem; color: #334155; height: 50px; }
    .status-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: capitalize; }
    .good { background: #dcfce7; color: #166534; }
    .damaged { background: #fee2e2; color: #ef4444; }
    .pending_inspection { background: #fff7ed; color: #c2410c; }
    .empty { text-align: center; color: #94a3b8; padding: 40px !important; }
  `]
})
export class WarehouseStockReceiptComponent implements OnInit {
  private fb = inject(FormBuilder);
  private warehouseService = inject(WarehouseService);
  private snack = inject(MatSnackBar);

  receiptForm: FormGroup = this.fb.group({
    productId: [null, Validators.required],
    quantityReceived: [null, [Validators.required, Validators.min(1)]],
    batchNumber: ['', Validators.required],
    conditionStatus: ['GOOD', Validators.required],
    qrCode: ['']
  });

  products: any[] = [];
  recentReceipts: StockReceipt[] = [];
  isScanning = false;

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.warehouseService.getAllProducts().subscribe(p => this.products = p);
    this.warehouseService.getReceipts().subscribe(r => this.recentReceipts = r);
  }

  saveReceipt() {
    if (this.receiptForm.valid) {
      this.warehouseService.receiveStock(this.receiptForm.value).subscribe({
        next: (res) => {
          this.snack.open('Stock Recorded Successfully', 'Close', { duration: 3000 });
          this.recentReceipts = [res, ...this.recentReceipts];
          this.receiptForm.reset({ conditionStatus: 'GOOD' });
        },
        error: () => this.snack.open('Error recording stock', 'Close', { duration: 3000 })
      });
    }
  }

  toggleScan() {
    this.isScanning = !this.isScanning;
    if (this.isScanning) {
      setTimeout(() => {
        this.receiptForm.patchValue({ qrCode: 'AUTO-SCAN-' + Math.random().toString(36).substring(7).toUpperCase() });
        this.isScanning = false;
        this.snack.open('QR Data Detected', 'Close', { duration: 2000 });
      }, 3000);
    }
  }

  resetForm() {
    this.receiptForm.reset({ conditionStatus: 'GOOD' });
  }
}
