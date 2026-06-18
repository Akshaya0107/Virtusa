import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-finance-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="logo-section">
        <img src="assets/logo-dark.png" alt="SupplySync" class="logo">
        <span class="app-name">SupplySync</span>
      </div>

      <nav class="nav-menu">
        <a routerLink="/finance/dashboard" routerLinkActive="active" class="nav-item">
          <i class="icon">📊</i>
          <span>Dashboard</span>
        </a>
        <a routerLink="/finance/purchase-orders" routerLinkActive="active" class="nav-item">
          <i class="icon">📜</i>
          <span>PO History</span>
        </a>
        <a routerLink="/finance/reports" routerLinkActive="active" class="nav-item">
          <i class="icon">📓</i>
          <span>Finance Reports</span>
        </a>
        <a routerLink="/finance/cost-analysis" routerLinkActive="active" class="nav-item">
          <i class="icon">📈</i>
          <span>Cost Analysis</span>
        </a>
        <a routerLink="/finance/supplier-tracking" routerLinkActive="active" class="nav-item">
          <i class="icon">🤝</i>
          <span>Supplier Tracking</span>
        </a>
        <a routerLink="/finance/audit-logs" routerLinkActive="active" class="nav-item">
          <i class="icon">🔐</i>
          <span>Audit Logs</span>
        </a>
      </nav>

      <div class="footer-nav">
        <a routerLink="/finance/settings" routerLinkActive="active" class="nav-item">
          <i class="icon">⚙️</i>
          <span>Settings</span>
        </a>
        <a (click)="logout()" class="nav-item logout">
          <i class="icon">🚪</i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background: #001f3f;
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      box-shadow: 4px 0 10px rgba(0,0,0,0.1);
    }
    .logo-section {
      padding: 30px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .logo {
      height: 40px;
      width: 40px;
    }
    .app-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #00d2ff;
    }
    .nav-menu {
      flex: 1;
      padding: 20px 0;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 12px 25px;
      color: #cbd5e0;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .nav-item:hover {
      background: rgba(0, 210, 255, 0.1);
      color: #00d2ff;
    }
    .nav-item.active {
      background: #00d2ff;
      color: #001f3f;
      font-weight: 600;
    }
    .footer-nav {
      padding: 20px 0;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .logout {
      color: #ff5c5c;
    }
    .logout:hover {
      background: rgba(255, 92, 92, 0.1);
      color: #ff5c5c;
    }
    .icon {
      font-size: 1.2rem;
    }
  `]
})
export class FinanceSidebarComponent {
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  }
}
