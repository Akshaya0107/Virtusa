import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehouse-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatDividerModule, FormsModule],
  template: `
    <div class="settings-container">
      <header class="page-header">
        <h1>System Settings</h1>
        <p>Manage your profile, notifications and appearance</p>
      </header>

      <div class="settings-grid">
        <mat-card class="settings-card profile">
          <mat-card-header>
            <mat-card-title>Profile Information</mat-card-title>
          </mat-card-header>
          <div class="card-content">
            <div class="avatar-section">
              <div class="avatar-circle">WS</div>
              <button mat-stroked-button color="primary">Change Photo</button>
            </div>
            <div class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <input matInput value="Warehouse Staff User">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput value="warehouse@supplysync.com" disabled>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Phone Number</mat-label>
                <input matInput value="+91 98765 43210">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Employee ID</mat-label>
                <input matInput value="WS-4402" disabled>
              </mat-form-field>
            </div>
          </div>
          <mat-card-actions align="end">
            <button mat-flat-button color="primary">Save Changes</button>
          </mat-card-actions>
        </mat-card>

        <div class="sub-column">
          <mat-card class="settings-card toggles">
            <mat-card-header>
              <mat-card-title>Notification Preferences</mat-card-title>
            </mat-card-header>
            <div class="toggle-list">
              <div class="toggle-item">
                <div class="info">
                  <div class="t-name">Low Stock Alerts</div>
                  <div class="t-desc">Notify when items fall below threshold</div>
                </div>
                <mat-slide-toggle color="primary" [checked]="true"></mat-slide-toggle>
              </div>
              <mat-divider></mat-divider>
              <div class="toggle-item">
                <div class="info">
                  <div class="t-name">Dispatch Updates</div>
                  <div class="t-desc">Alert for packed and delayed shipments</div>
                </div>
                <mat-slide-toggle color="primary" [checked]="true"></mat-slide-toggle>
              </div>
              <mat-divider></mat-divider>
              <div class="toggle-item">
                <div class="info">
                  <div class="t-name">Email Digests</div>
                  <div class="t-desc">Daily summary of warehouse activity</div>
                </div>
                <mat-slide-toggle color="primary"></mat-slide-toggle>
              </div>
            </div>
          </mat-card>

          <mat-card class="settings-card theme">
            <mat-card-header>
              <mat-card-title>System Appearance</mat-card-title>
            </mat-card-header>
            <div class="theme-options">
              <div class="theme-btn active">
                <mat-icon>light_mode</mat-icon> Light Mode
              </div>
              <div class="theme-btn">
                <mat-icon>dark_mode</mat-icon> Dark Mode
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { display: flex; flex-direction: column; gap: 30px; }
    .page-header h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; }
    .page-header p { color: #64748b; margin-top: 5px; }

    .settings-grid { display: grid; grid-template-columns: 1fr 400px; gap: 30px; }
    .sub-column { display: flex; flex-direction: column; gap: 30px; }
    
    .settings-card { border-radius: 24px; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    mat-card-title { font-weight: 800; color: #1e293b; font-size: 1.1rem; }
    
    .card-content { padding: 25px; }
    .avatar-section { display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 30px; }
    .avatar-circle { width: 80px; height: 80px; background: #e0f2fe; color: #0369a1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; }
    
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    mat-card-actions { padding: 20px 25px !important; border-top: 1px solid #f1f5f9; }

    .toggle-list { padding: 10px 25px; }
    .toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
    .t-name { font-weight: 700; color: #1e293b; }
    .t-desc { font-size: 0.8rem; color: #64748b; margin-top: 2px; }

    .theme-options { padding: 20px 25px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .theme-btn { padding: 15px; border: 2px solid #f1f5f9; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.2s; }
    .theme-btn.active { border-color: #0ea5e9; color: #0ea5e9; background: #f0f9ff; }
  `]
})
export class WarehouseSettingsComponent {}
