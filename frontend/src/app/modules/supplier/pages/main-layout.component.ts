import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-supplier-main-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule,
    MatButtonModule, MatBadgeModule, MatMenuModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidebar">
        <div class="logo-container">
          <div class="logo-glow"></div>
          <span class="logo-text">SupplySync</span>
          <span class="role-badge">Supplier Portal</span>
        </div>
        
        <mat-nav-list class="nav-list">
          <a mat-list-item routerLink="/supplier/dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/supplier/purchase-orders" routerLinkActive="active-link">
            <mat-icon matListItemIcon>shopping_basket</mat-icon>
            <span matListItemTitle>Purchase Orders</span>
          </a>
          <a mat-list-item routerLink="/supplier/confirm-eta" routerLinkActive="active-link">
            <mat-icon matListItemIcon>event_available</mat-icon>
            <span matListItemTitle>Confirm ETA</span>
          </a>
          <a mat-list-item routerLink="/supplier/delivery-history" routerLinkActive="active-link">
            <mat-icon matListItemIcon>history</mat-icon>
            <span matListItemTitle>Delivery History</span>
          </a>
          <a mat-list-item routerLink="/supplier/settings" routerLinkActive="active-link">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
        </mat-nav-list>

        <div class="sidebar-footer">
          <button mat-button class="logout-btn" (click)="logout()">
            <mat-icon>logout</mat-icon> Logout
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar class="top-bar">
          <div class="toolbar-spacer"></div>
          
          <button mat-icon-button class="tool-btn" [matMenuTriggerFor]="notifMenu">
            <mat-icon>notifications</mat-icon>
            <span class="note-badge">3</span>
          </button>
          <mat-menu #notifMenu="matMenu" class="modern-menu">
            <div class="menu-header">Notifications</div>
            <button mat-menu-item>
              <mat-icon color="primary">assignment</mat-icon>
              <span>New Purchase Order #PO-1045 assigned</span>
            </button>
            <button mat-menu-item>
              <mat-icon color="accent">event</mat-icon>
              <span>ETA Reminder for PO-1022</span>
            </button>
            <button mat-menu-item>
              <mat-icon color="warn">warning</mat-icon>
              <span>Shipment delayed for PO-8942</span>
            </button>
          </mat-menu>

          <div class="user-profile" [matMenuTriggerFor]="userMenu">
            <div class="user-info">
              <span class="u-name">{{ user?.fullName }}</span>
              <span class="u-role">Supplier Access</span>
            </div>
            <div class="u-avatar">SP</div>
          </div>
          <mat-menu #userMenu="matMenu" class="modern-menu">
            <button mat-menu-item routerLink="settings">
              <mat-icon>person</mat-icon>
              <span>My Profile</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Sign Out</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; background: #f1f5f9; }
    .sidebar { width: 280px; background: #0f172a; color: white; border: none; display: flex; flex-direction: column; }
    
    .logo-container { padding: 35px 25px; position: relative; text-align: center; }
    .logo-text { font-size: 1.6rem; font-weight: 900; letter-spacing: -0.5px; background: linear-gradient(to right, #60a5fa, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .role-badge { display: block; font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px; }
    .logo-glow { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: #3b82f6; filter: blur(60px); opacity: 0.15; z-index: -1; }

    .nav-list { padding: 10px 15px; flex: 1; }
    mat-list-item { height: 54px !important; margin-bottom: 6px; border-radius: 12px !important; transition: all 0.3s; color: #94a3b8 !important; }
    mat-list-item:hover { background: rgba(255,255,255,0.05) !important; color: white !important; }
    .active-link { background: #3b82f6 !important; color: white !important; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); }
    .active-link mat-icon { color: white !important; }
    
    .sidebar-footer { padding: 25px; border-top: 1px solid rgba(255,255,255,0.1); }
    .logout-btn { width: 100%; height: 50px; border-radius: 10px; color: #fca5a5 !important; background: rgba(239, 68, 68, 0.1); font-weight: 600; }
    .logout-btn:hover { background: rgba(239, 68, 68, 0.2); }

    .top-bar { background: white; border-bottom: 1px solid #e2e8f0; color: #1e293b; height: 75px; padding: 0 35px; }
    .toolbar-spacer { flex: 1 1 auto; }
    .tool-btn { position: relative; margin-right: 20px; color: #64748b; }
    .note-badge { position: absolute; top: 5px; right: 5px; background: #ef4444; color: white; font-size: 10px; padding: 2px 5px; border-radius: 10px; border: 2px solid white; }
    
    .user-profile { display: flex; align-items: center; gap: 15px; padding: 5px 15px; border-radius: 40px; background: #f8fafc; cursor: pointer; transition: background 0.2s; }
    .user-profile:hover { background: #f1f5f9; }
    .user-info { text-align: right; }
    .u-name { font-weight: 700; color: #0f172a; font-size: 0.9rem; }
    .u-role { font-size: 0.75rem; color: #64748b; }
    .u-avatar { width: 40px; height: 40px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; }

    .page-content { padding: 30px; background: #f8fafc; min-height: calc(100vh - 80px); }

    .modern-menu { border-radius: 20px; padding: 10px; margin-top: 10px; }
    .menu-header { padding: 10px 15px; font-weight: 800; color: #64748b; font-size: 0.75rem; text-transform: uppercase; }
  `]
})
export class SupplierMainLayoutComponent {
  private storageService = inject(StorageService);
  user = this.storageService.getUser();
  private router = inject(Router);
  private auth = inject(AuthService);

  toggleSidenav() {
    // Logic for responsiveness if needed
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }
}
