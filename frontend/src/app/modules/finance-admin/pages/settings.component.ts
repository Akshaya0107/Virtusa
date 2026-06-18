import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-page">
      <h1 class="page-title">Finance Admin Settings</h1>

      <div class="settings-grid">
        <!-- Profile Section -->
        <div class="settings-card">
          <div class="card-header">
            <i class="icon">👤</i>
            <h3>Profile Settings</h3>
          </div>
          <div class="card-body">
            <div class="form-row">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" value="Akshaya0107" readonly>
              </div>
              <div class="form-group">
                <label>Employee ID</label>
                <input type="text" value="FIN-ADMIN-2026-001" readonly>
              </div>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" value="finance@supplysync.com" readonly>
            </div>
            <button class="btn-primary">Edit Profile</button>
          </div>
        </div>

        <!-- Notifications -->
        <div class="settings-card">
          <div class="card-header">
            <i class="icon">🔔</i>
            <h3>Notification Preferences</h3>
          </div>
          <div class="card-body">
            <div class="toggle-group">
              <div class="toggle-item">
                <div class="toggle-info">
                  <strong>PO Approval Alerts</strong>
                  <p>Get notified when a new PO needs review.</p>
                </div>
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider"></span>
                </label>
              </div>
              <div class="toggle-item">
                <div class="toggle-info">
                  <strong>Budget Thresholds</strong>
                  <p>Alert when spending reaches 80% and 95%.</p>
                </div>
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider"></span>
                </label>
              </div>
              <div class="toggle-item">
                <div class="toggle-info">
                  <strong>Weekly Summaries</strong>
                  <p>Receive a financial summary every Monday.</p>
                </div>
                <label class="switch">
                  <input type="checkbox">
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Appearance -->
        <div class="settings-card">
          <div class="card-header">
            <i class="icon">🎨</i>
            <h3>Appearance</h3>
          </div>
          <div class="card-body">
            <div class="theme-selector">
              <div class="theme-option active">
                <div class="theme-preview light"></div>
                <span>Light Mode</span>
              </div>
              <div class="theme-option">
                <div class="theme-preview dark"></div>
                <span>Dark Mode</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="settings-card">
          <div class="card-header">
            <i class="icon">🔒</i>
            <h3>Security & Session</h3>
          </div>
          <div class="card-body">
            <div class="security-btns">
              <button class="btn-outline">Change Password</button>
              <button class="btn-outline">Two-Factor Auth</button>
            </div>
            <div class="session-info">
              <p>Last login: Today, 10:25 AM from Windows Desktop</p>
              <button class="btn-logout-full" (click)="logout()">Logout from all sessions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { display: flex; flex-direction: column; gap: 35px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #1e293b; }

    .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 30px; }
    .settings-card { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; }
    
    .card-header { padding: 20px 25px; background: #f8fafc; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 15px; }
    .card-header .icon { font-size: 1.2rem; }
    .card-header h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }

    .card-body { padding: 25px; }
    
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; color: #64748b; font-weight: 600; font-size: 0.9rem; }
    .form-group input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; outline: none; }
    
    .btn-primary { background: #00d2ff; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn-outline { background: white; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 8px; color: #475569; font-weight: 600; cursor: pointer; }
    .security-btns { display: flex; gap: 15px; margin-bottom: 20px; }

    .btn-logout-full { margin-top: 15px; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; }

    .toggle-group { display: flex; flex-direction: column; gap: 20px; }
    .toggle-item { display: flex; justify-content: space-between; align-items: center; }
    .toggle-info strong { display: block; color: #334155; margin-bottom: 4px; }
    .toggle-info p { margin: 0; font-size: 0.85rem; color: #94a3b8; }

    /* Switch Style */
    .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; inset: 0; background-color: #cbd5e0; transition: .4s; border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: #00d2ff; }
    input:checked + .slider:before { transform: translateX(24px); }

    .theme-selector { display: flex; gap: 20px; }
    .theme-option { flex: 1; border: 2px solid #f1f5f9; padding: 15px; border-radius: 12px; cursor: pointer; text-align: center; }
    .theme-option.active { border-color: #00d2ff; background: #f0faff; }
    .theme-preview { height: 80px; border-radius: 8px; margin-bottom: 10px; }
    .theme-preview.light { background: #f8fafc; border: 1px solid #e2e8f0; }
    .theme-preview.dark { background: #001f3f; }
    
    .session-info { margin-top: 15px; padding-top: 20px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 0.85rem; }
  `]
})
export class FinanceSettingsComponent {
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  }
}
