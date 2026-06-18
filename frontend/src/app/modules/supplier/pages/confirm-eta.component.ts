import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SupplierService } from '../services/supplier.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-confirm-eta',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, 
    MatCardModule, MatInputModule, MatSelectModule, 
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, 
    MatIconModule, MatSnackBarModule
  ],
  template: `
    <div class="confirm-container">
      <header class="page-header">
        <h1>Confirm Delivery ETA</h1>
        <p>Set shipping dates and expected delivery times for your orders</p>
      </header>

      <div class="form-grid">
        <mat-card class="form-card">
          <form [formGroup]="etaForm" (ngSubmit)="onSubmit()">
            <div class="row">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Select Purchase Order</mat-label>
                <mat-select formControlName="purchaseOrderId">
                  <mat-option *ngFor="let po of orders" [value]="po.id">
                    #{{po.orderNumber}} - {{po.items?.[0]?.product?.name}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="row duo">
              <mat-form-field appearance="outline">
                <mat-label>Shipment Date</mat-label>
                <input matInput [matDatepicker]="shipPicker" formControlName="shipmentDate">
                <mat-datepicker-toggle matIconSuffix [for]="shipPicker"></mat-datepicker-toggle>
                <mat-datepicker #shipPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Expected Delivery</mat-label>
                <input matInput [matDatepicker]="delPicker" formControlName="expectedDeliveryDate">
                <mat-datepicker-toggle matIconSuffix [for]="delPicker"></mat-datepicker-toggle>
                <mat-datepicker #delPicker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="row duo">
              <mat-form-field appearance="outline">
                <mat-label>Vehicle Number</mat-label>
                <input matInput formControlName="vehicleNumber" placeholder="KA-01-AB-1234">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>ETA Status</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="ON_TIME">On Time</mat-option>
                  <mat-option value="DELAYED">Delayed</mat-option>
                  <mat-option value="PARTIAL_DELIVERY">Partial Delivery</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Delivery Notes</mat-label>
              <textarea matInput formControlName="deliveryNotes" placeholder="Additional details for the warehouse..."></textarea>
            </mat-form-field>

            <div class="actions">
              <button mat-flat-button color="primary" [disabled]="!etaForm.valid || loading">
                {{ loading ? 'Saving...' : 'Confirm Delivery Schedule' }}
              </button>
            </div>
          </form>
        </mat-card>

        <mat-card class="help-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">info</mat-icon>
            <mat-card-title>Quick Tip</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Confirming the ETA updates the Store Manager's dashboard. Ensure the vehicle number is correct for warehouse gate entry.</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .confirm-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .form-grid { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
    .form-card { border-radius: 24px; border: none; padding: 30px; }
    .row { display: flex; gap: 20px; margin-bottom: 5px; }
    .row.duo > * { flex: 1; }
    .full { width: 100%; }
    
    .actions { display: flex; justify-content: flex-end; margin-top: 20px; }
    .actions button { height: 50px; padding: 0 40px; border-radius: 12px; font-weight: 700; }

    .help-card { border-radius: 24px; background: #e0f2fe; border: none; }
    .help-card p { color: #0369a1; font-size: 0.95rem; margin-top: 15px; }
  `]
})
export class ConfirmETAComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(SupplierService);
  private storage = inject(StorageService);
  private snack = inject(MatSnackBar);

  etaForm: FormGroup;
  orders: any[] = [];
  loading = false;

  constructor() {
    this.etaForm = this.fb.group({
      purchaseOrderId: ['', Validators.required],
      shipmentDate: [new Date(), Validators.required],
      expectedDeliveryDate: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      deliveryNotes: [''],
      status: ['ON_TIME', Validators.required]
    });
  }

  ngOnInit() {
    const user = this.storage.getUser();
    if (user && user.id) {
      this.service.getPurchaseOrders(user.id).subscribe(data => {
        this.orders = data.filter(o => o.status === 'PENDING' || o.status === 'CONFIRMED');
      });
    }
  }

  onSubmit() {
    if (this.etaForm.valid) {
      this.loading = true;
      const val = this.etaForm.value;
      const payload = {
        ...val,
        purchaseOrder: { id: val.purchaseOrderId },
        shipmentDate: this.formatDate(val.shipmentDate),
        expectedDeliveryDate: this.formatDate(val.expectedDeliveryDate)
      };

      this.service.confirmETA(payload).subscribe({
        next: () => {
          this.snack.open('ETA Confirmed Successfully!', 'Close', { duration: 3000 });
          this.loading = false;
          this.etaForm.reset({ status: 'ON_TIME', shipmentDate: new Date() });
          this.ngOnInit(); // Refresh list to remove confirmed order if needed
        },
        error: () => {
          this.snack.open('Error saving ETA details.', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
}
