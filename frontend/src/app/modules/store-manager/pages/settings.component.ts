import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, 
    MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatRadioModule
  ],
  template: `
    <div class="settings-container">
      <header class="page-header">
        <h1>Account Settings</h1>
        <p>Manage your profile, notifications and system preferences</p>
      </header>

      <div class="settings-grid">
        <!-- Profile Section -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>person</mat-icon>
            <mat-card-title>Profile Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="profile-form">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <input matInput [(ngModel)]="user.fullName">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput [(ngModel)]="user.email" disabled>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Phone Number</mat-label>
                <input matInput [(ngModel)]="user.phone">
              </mat-form-field>
              
              <mat-divider style="margin: 20px 0"></mat-divider>
              
              <mat-form-field appearance="outline">
                <mat-label>New Password</mat-label>
                <input matInput type="password" [(ngModel)]="user.newPassword" placeholder="Minimum 8 characters">
              </mat-form-field>
              <div class="action-row">
                <button mat-raised-button color="primary" (click)="saveProfile()">Update Profile</button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Notification Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>notifications_active</mat-icon>
            <mat-card-title>Notification Preferences</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="toggle-list">
              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="t-title">Stock Alerts</div>
                  <div class="t-desc">Notify when products fall below threshold</div>
                </div>
                <mat-slide-toggle [(ngModel)]="settings.stockAlerts"></mat-slide-toggle>
              </div>
              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="t-title">Purchase Alerts</div>
                  <div class="t-desc">Notify on new order creation or status change</div>
                </div>
                <mat-slide-toggle [(ngModel)]="settings.purchaseAlerts"></mat-slide-toggle>
              </div>
              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="t-title">Supplier Updates</div>
                  <div class="t-desc">Changes to supplier catalog or delivery times</div>
                </div>
                <mat-slide-toggle [(ngModel)]="settings.supplierUpdates"></mat-slide-toggle>
              </div>
              <div class="toggle-item">
                <div class="toggle-info">
                  <div class="t-title">System Alerts</div>
                  <div class="t-desc">Critical system updates and security logs</div>
                </div>
                <mat-slide-toggle [(ngModel)]="settings.systemAlerts"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Theme & Style -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>palette</mat-icon>
            <mat-card-title>Theme Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-radio-group [(ngModel)]="settings.theme" class="theme-group">
              <mat-radio-button value="light">
                <mat-icon>light_mode</mat-icon> Light Mode
              </mat-radio-button>
              <mat-radio-button value="dark">
                <mat-icon>dark_mode</mat-icon> Dark Mode
              </mat-radio-button>
            </mat-radio-group>
          </mat-card-content>
        </mat-card>

        <!-- Company Section -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>business</mat-icon>
            <mat-card-title>Company Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Company Name</mat-label>
              <input matInput [(ngModel)]="company.name">
            </mat-form-field>
            <div class="logo-upload">
              <div class="logo-preview">
                <mat-icon>image</mat-icon>
              </div>
              <div class="upload-info">
                <div class="t-title">Company Logo</div>
                <button mat-stroked-button (click)="logoInput.click()">Upload Logo</button>
                <input #logoInput type="file" hidden>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { padding: 30px; background: #f8fafc; min-height: 100vh; }
    .page-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0; }
    .page-header p { color: #64748b; margin-top: 4px; }

    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-top: 30px; }
    .settings-card { border-radius: 20px; border: none; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    mat-card-header { padding: 20px 20px 10px; }
    mat-card-content { padding: 20px; }

    .profile-form { display: flex; flex-direction: column; gap: 10px; }
    .action-row { margin-top: 10px; }

    .toggle-list { display: flex; flex-direction: column; gap: 20px; }
    .toggle-item { display: flex; justify-content: space-between; align-items: center; }
    .t-title { font-weight: 600; color: #334155; }
    .t-desc { font-size: 0.8rem; color: #64748b; }

    .theme-group { display: flex; flex-direction: column; gap: 15px; }
    .full-width { width: 100%; }

    .logo-upload { display: flex; gap: 20px; align-items: center; margin-top: 15px; }
    .logo-preview { width: 80px; height: 80px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .logo-preview mat-icon { font-size: 32px; width: 32px; height: 32px; color: #cbd5e1; }
  `]
})
export class SettingsComponent {
  user = { fullName: 'Store Manager', email: 'storemanager@supplysync.com', phone: '+91 98765 43210', newPassword: '' };
  settings = { stockAlerts: true, purchaseAlerts: true, supplierUpdates: false, systemAlerts: true, theme: 'light' };
  company = { name: 'SupplySync' };

  saveProfile() {
    alert('Profile updated successfully!');
  }
}
