import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-supplier-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatDividerModule],
  template: `
    <div class="settings-container">
      <header class="page-header">
        <h1>Settings & Preferences</h1>
        <p>Manage your supplier profile and system configurations</p>
      </header>

      <div class="settings-sections">
        <mat-card class="settings-card">
          <div class="section-header">
            <mat-icon>person</mat-icon>
            <h3>Profile Settings</h3>
          </div>
          <mat-divider></mat-divider>
          <div class="section-content">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Supplier Name</mat-label>
                <input matInput [(ngModel)]="user.fullName">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput [(ngModel)]="user.email" readonly>
              </mat-form-field>
            </div>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Company Name</mat-label>
                <input matInput value="ABC Suppliers Pvt Ltd">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Phone Number</mat-label>
                <input matInput value="+91 98765 43210">
              </mat-form-field>
            </div>
            <button mat-flat-button color="primary">Update Profile</button>
          </div>
        </mat-card>

        <mat-card class="settings-card">
          <div class="section-header">
            <mat-icon>notifications</mat-icon>
            <h3>Notification Preferences</h3>
          </div>
          <mat-divider></mat-divider>
          <div class="section-content toggles">
            <div class="toggle-item">
              <div class="text">
                <strong>New Purchase Orders</strong>
                <span>Get notified when a store manager assigns a PO</span>
              </div>
              <mat-slide-toggle [checked]="true"></mat-slide-toggle>
            </div>
            <div class="toggle-item">
              <div class="text">
                <strong>ETA Reminders</strong>
                <span>Remind me to confirm delivery date for pending orders</span>
              </div>
              <mat-slide-toggle [checked]="true"></mat-slide-toggle>
            </div>
            <div class="toggle-item">
              <div class="text">
                <strong>Delivery Alerts</strong>
                <span>Get updates on successful or delayed deliveries</span>
              </div>
              <mat-slide-toggle [checked]="false"></mat-slide-toggle>
            </div>
          </div>
        </mat-card>

        <mat-card class="settings-card">
          <div class="section-header">
            <mat-icon>security</mat-icon>
            <h3>Security</h3>
          </div>
          <mat-divider></mat-divider>
          <div class="section-content">
            <button mat-stroked-button color="warn">Change Password</button>
            <p class="security-note">Last password change: 3 months ago</p>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .settings-sections { display: flex; flex-direction: column; gap: 24px; max-width: 900px; }
    .settings-card { border-radius: 24px; border: none; padding: 0; overflow: hidden; }
    
    .section-header { padding: 20px 25px; display: flex; align-items: center; gap: 15px; }
    .section-header mat-icon { color: #0ea5e9; }
    .section-header h3 { margin: 0; font-weight: 700; color: #1e293b; }
    
    .section-content { padding: 25px; }
    .form-row { display: flex; gap: 20px; }
    .form-row mat-form-field { flex: 1; }

    .toggles { display: flex; flex-direction: column; gap: 20px; }
    .toggle-item { display: flex; justify-content: space-between; align-items: center; }
    .toggle-item .text { display: flex; flex-direction: column; }
    .toggle-item strong { color: #1e293b; font-size: 0.95rem; }
    .toggle-item span { color: #64748b; font-size: 0.85rem; }

    .security-note { margin-top: 15px; font-size: 0.85rem; color: #94a3b8; }
  `]
})
export class SupplierSettingsComponent implements OnInit {
  user: any = {};
  private storage = inject(StorageService);

  ngOnInit() {
    this.user = this.storage.getUser() || {};
  }
}
