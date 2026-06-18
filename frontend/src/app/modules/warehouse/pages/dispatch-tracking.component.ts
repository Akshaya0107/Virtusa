import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dispatch-tracking',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatTabsModule, MatDividerModule, MatDialogModule, MatSnackBarModule],
  template: `
    <div class="dispatch-container">
      <header class="page-header">
        <h1>Dispatch & Returns</h1>
        <p>Monitor outgoing shipments and manage customer returns</p>
      </header>

      <div class="tracker-wrap">
        <mat-tab-group class="main-tabs">
          <!-- Outgoing Dispatch Tab -->
          <mat-tab label="Outgoing Shipments">
            <div class="tab-content">
              <div class="status-cards">
                <mat-card class="s-card active">
                  <span class="label">In Transit</span>
                  <h3 class="val">18</h3>
                </mat-card>
                <mat-card class="s-card">
                  <span class="label">Packed</span>
                  <h3 class="val">24</h3>
                </mat-card>
                <mat-card class="s-card error">
                  <span class="label">Delayed</span>
                  <h3 class="val">2</h3>
                </mat-card>
              </div>

              <mat-card class="table-card">
                <div class="table-wrap">
                  <table mat-table [dataSource]="dispatches">
                    <ng-container matColumnDef="id">
                      <th mat-header-cell *matHeaderCellDef> Dispatch ID </th>
                      <td mat-cell *matCellDef="let d"> <span class="id-text">#{{ d.id }}</span> </td>
                    </ng-container>

                    <ng-container matColumnDef="product">
                      <th mat-header-cell *matHeaderCellDef> Product </th>
                      <td mat-cell *matCellDef="let d"> {{ d.product }} </td>
                    </ng-container>

                    <ng-container matColumnDef="destination">
                      <th mat-header-cell *matHeaderCellDef> Destination </th>
                      <td mat-cell *matCellDef="let d"> {{ d.destination }} </td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef> Status </th>
                      <td mat-cell *matCellDef="let d">
                        <span class="status-chip" [ngClass]="d.status.toLowerCase()">{{ d.status }}</span>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef> Tracking </th>
                      <td mat-cell *matCellDef="let d">
                        <button mat-stroked-button class="track-btn" (click)="openTracking(d)">Track</button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="dispatchColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: dispatchColumns;"></tr>
                  </table>
                </div>
              </mat-card>
            </div>
          </mat-tab>

          <!-- Returns Management Tab -->
          <mat-tab label="Returns Management">
            <div class="tab-content">
              <div class="return-form-section">
                <mat-card class="return-card">
                  <mat-card-header>
                    <mat-card-title>Process Return Request</mat-card-title>
                  </mat-card-header>
                  <div class="ret-actions">
                    <button mat-raised-button color="primary">Scan Return Label</button>
                    <button mat-button>Manual Entry</button>
                  </div>
                </mat-card>
              </div>

              <mat-card class="table-card">
                <div class="table-wrap">
                  <table mat-table [dataSource]="returns">
                    <ng-container matColumnDef="id">
                      <th mat-header-cell *matHeaderCellDef> Return ID </th>
                      <td mat-cell *matCellDef="let r"> <span class="id-text">#RET-{{ r.id }}</span> </td>
                    </ng-container>

                    <ng-container matColumnDef="product">
                      <th mat-header-cell *matHeaderCellDef> Product </th>
                      <td mat-cell *matCellDef="let r"> {{ r.product }} </td>
                    </ng-container>

                    <ng-container matColumnDef="reason">
                      <th mat-header-cell *matHeaderCellDef> Reason </th>
                      <td mat-cell *matCellDef="let r"> {{ r.reason }} </td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef> Status </th>
                      <td mat-cell *matCellDef="let r">
                        <span class="status-chip" [ngClass]="r.status.toLowerCase()">{{ r.status }}</span>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef> Actions </th>
                      <td mat-cell *matCellDef="let r">
                        <button mat-icon-button color="primary" *ngIf="r.status === 'PENDING'"><mat-icon>check_circle</mat-icon></button>
                        <button mat-icon-button color="warn" *ngIf="r.status === 'PENDING'"><mat-icon>cancel</mat-icon></button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="returnColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: returnColumns;"></tr>
                  </table>
                </div>
              </mat-card>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .dispatch-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .main-tabs { margin-top: 10px; }
    .tab-content { padding: 30px 5px; display: flex; flex-direction: column; gap: 30px; }

    .status-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .s-card { border-radius: 20px; border: none; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.03); }
    .s-card .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
    .s-card .val { font-size: 1.75rem; font-weight: 800; margin: 8px 0 0 0; color: #0f172a; }
    .s-card.active { border-left: 5px solid #0ea5e9; }
    .s-card.error { border-left: 5px solid #ef4444; }
    .s-card.error .val { color: #ef4444; }

    .table-card { border-radius: 24px; border: none; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .table-wrap { padding: 10px; }
    table { width: 100%; }
    th { color: #64748b; font-weight: 700; font-size: 0.75rem; background: #f8fafc; }
    td { height: 70px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }

    .id-text { font-family: 'Roboto Mono', monospace; font-weight: 700; color: #64748b; }
    
    .status-chip { padding: 6px 12px; border-radius: 30px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .in_transit { background: #e0f2fe; color: #0369a1; }
    .packed { background: #f1f5f9; color: #475569; }
    .delivered { background: #dcfce7; color: #15803d; }
    .delayed { background: #fef2f2; color: #dc2626; }
    .pending { background: #fff7ed; color: #c2410c; }
    .accepted { background: #dcfce7; color: #15803d; }

    .track-btn { border-radius: 10px; font-weight: 600; font-size: 0.75rem; }

    .return-card { border-radius: 20px; border: none; padding: 25px; background: #0f172a; color: white; }
    .return-card mat-card-title { color: white; font-weight: 800; }
    .ret-actions { display: flex; gap: 15px; margin-top: 20px; }
  `]
})
export class WarehouseDispatchTrackingComponent {
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  dispatchColumns = ['id', 'product', 'destination', 'status', 'actions'];
  returnColumns = ['id', 'product', 'reason', 'status', 'actions'];

  dispatches = [
    { id: 'DS-9001', product: 'Dual-Monitor Stand', destination: 'Bangalore Hub', status: 'IN_TRANSIT' },
    { id: 'DS-9005', product: 'LED Desk Lamp', destination: 'Mumbai Retail B', status: 'PACKED' },
    { id: 'DS-8942', product: 'Wireless Mouse Pro', destination: 'Chennai Warehouse', status: 'DELIVERED' },
    { id: 'DS-9010', product: 'Ergonomic Mousepad', destination: 'Delhi Central', status: 'DELAYED' },
  ];

  returns = [
    { id: '8821', product: 'Smart Watch X2', reason: 'Damaged on Delivery', status: 'PENDING' },
    { id: '8815', product: 'Type-C Hub 7-in-1', reason: 'Wrong Color Sent', status: 'ACCEPTED' },
    { id: '8830', product: 'Bluetooth Speaker Mini', reason: 'Defective Battery', status: 'PENDING' },
  ];

  openTracking(dispatch: any) {
    this.snack.open(`Fetching real-time tracking for ${dispatch.id}...`, 'Close', { duration: 2000 });
    
    setTimeout(() => {
      this.dialog.open(TrackingDialogComponent, {
        width: '500px',
        data: dispatch,
        panelClass: 'custom-dialog-container'
      });
    }, 1000);
  }
}

@Component({
  selector: 'app-tracking-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule],
  template: `
    <div class="tracking-dialog">
      <div class="header">
        <div class="title-row">
          <mat-icon>local_shipping</mat-icon>
          <h2>Tracking Details: {{ data.id }}</h2>
        </div>
        <button mat-icon-button mat-dialog-close><mat-icon>close</mat-icon></button>
      </div>
      <mat-divider></mat-divider>
      <div class="content">
        <div class="track-row">
          <span class="label">Product:</span>
          <span class="val">{{ data.product }}</span>
        </div>
        <div class="track-row">
          <span class="label">Status:</span>
          <span class="status-badge" [ngClass]="data.status.toLowerCase()">{{ data.status }}</span>
        </div>
        <div class="track-row">
          <span class="label">Destination:</span>
          <span class="val">{{ data.destination }}</span>
        </div>
        <div class="track-row">
          <span class="label">Estimated Delivery:</span>
          <span class="val highlight">Within 24-48 Hours</span>
        </div>
        
        <div class="timeline">
          <div class="step completed">
            <div class="dot icon"><mat-icon>check</mat-icon></div>
            <div class="text">
              <strong>Order Processed</strong>
              <span>June 15, 2026 - 10:30 AM</span>
            </div>
          </div>
          <div class="step completed">
            <div class="dot icon"><mat-icon>check</mat-icon></div>
            <div class="text">
              <strong>Shipped from Warehouse</strong>
              <span>June 16, 2026 - 02:45 PM</span>
            </div>
          </div>
          <div class="step active">
            <div class="dot pulse"></div>
            <div class="text">
              <strong>In Transit</strong>
              <span>On the way to {{ data.destination }}</span>
            </div>
          </div>
          <div class="step">
            <div class="dot"></div>
            <div class="text">
              <strong>Out for Delivery</strong>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <button mat-flat-button color="primary" mat-dialog-close>Close Tracker</button>
      </div>
    </div>
  `,
  styles: [`
    .tracking-dialog { padding: 30px; font-family: 'Inter', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .title-row { display: flex; align-items: center; gap: 15px; }
    .title-row mat-icon { color: #0ea5e9; font-size: 2rem; width: 32px; height: 32px; }
    .header h2 { margin: 0; font-weight: 800; color: #0f172a; font-size: 1.5rem; }
    
    .content { padding: 25px 0; display: flex; flex-direction: column; gap: 20px; }
    .track-row { display: flex; justify-content: space-between; align-items: center; }
    .track-row .label { color: #64748b; font-weight: 500; font-size: 0.9rem; }
    .track-row .val { color: #0f172a; font-weight: 700; }
    .track-row .highlight { color: #0ea5e9; }
    
    .status-badge { padding: 5px 12px; border-radius: 30px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .in_transit { background: #e0f2fe; color: #0369a1; }
    .packed { background: #f1f5f9; color: #475569; }
    .delivered { background: #dcfce7; color: #15803d; }
    .delayed { background: #fef2f2; color: #dc2626; }

    .timeline { margin-top: 30px; border-left: 2px dashed #e2e8f0; padding-left: 25px; display: flex; flex-direction: column; gap: 25px; position: relative; }
    .step { position: relative; }
    .step .dot { position: absolute; left: -36px; top: 0; width: 20px; height: 20px; border-radius: 50%; background: #e2e8f0; border: 4px solid white; z-index: 2; }
    .step.completed .dot { background: #15803d; color: white; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; left: -38px; border: none; }
    .step.completed .dot mat-icon { font-size: 14px; width: 14px; height: 14px; }
    .step.active .dot { background: #0ea5e9; box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.2); }
    .pulse { animation: pulse-animation 2s infinite; }
    @keyframes pulse-animation { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(14, 165, 233, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); } }

    .step .text { display: flex; flex-direction: column; }
    .step .text strong { font-size: 0.95rem; color: #1e293b; }
    .step .text span { font-size: 0.8rem; color: #94a3b8; }
    .step.active .text strong { color: #0ea5e9; }

    .footer { display: flex; justify-content: flex-end; margin-top: 10px; }
    .footer button { border-radius: 12px; padding: 0 25px; font-weight: 700; }
  `]
})
export class TrackingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
