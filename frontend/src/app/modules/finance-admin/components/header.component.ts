import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="search-bar">
        <i class="icon">🔍</i>
        <input type="text" placeholder="Search for POs, reports, or invoices...">
      </div>
      
      <div class="header-actions">
        <div class="notification-bell" (click)="toggleNotifications()">
          <i class="icon">🔔</i>
          <span class="badge">3</span>
          
          <div class="notification-dropdown" *ngIf="showNotifications">
            <div class="notif-header">Notifications</div>
            <div class="notif-list">
              <div class="notif-item">
                <p><strong>New PO Pending</strong></p>
                <small>PO-1052 requires approval</small>
              </div>
              <div class="notif-item">
                <p><strong>Budget Alert</strong></p>
                <small>Monthly spend reached 80%</small>
              </div>
              <div class="notif-item">
                <p><strong>Report Ready</strong></p>
                <small>Q2 Cost Summary generated</small>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <div class="avatar">👤</div>
          <div class="profile-info">
            <p class="name">Akshaya0107</p>
            <p class="role">Finance Admin</p>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 80px;
      padding: 0 40px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .search-bar {
      display: flex;
      align-items: center;
      background: #f4f7f6;
      padding: 10px 20px;
      border-radius: 12px;
      width: 400px;
      gap: 10px;
    }
    .search-bar input {
      border: none;
      background: transparent;
      width: 100%;
      outline: none;
      font-size: 0.95rem;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 30px;
    }
    .notification-bell {
      position: relative;
      cursor: pointer;
      font-size: 1.5rem;
    }
    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ff5c5c;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 10px;
      border: 2px solid white;
    }
    .profile-section {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    .profile-info p {
      margin: 0;
    }
    .name {
      font-weight: 600;
      color: #2d3748;
    }
    .role {
      font-size: 0.85rem;
      color: #718096;
    }
    .notification-dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      width: 300px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }
    .notif-header {
      padding: 15px;
      font-weight: 700;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    .notif-item {
      padding: 12px 15px;
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.2s;
    }
    .notif-item:hover {
      background: #f8fafc;
    }
    .notif-item p { margin: 0; font-size: 0.9rem; }
    .notif-item small { color: #64748b; }
  `]
})
export class FinanceHeaderComponent {
  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
