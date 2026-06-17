import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../services/storage.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, 
    MatListModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatMenuModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidebar">
        <div class="logo-container">
          <div class="logo-glow"></div>
          <span class="logo-text">SupplySync</span>
          <span class="role-badge">Store Manager</span>
        </div>

        <mat-nav-list class="nav-list">
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/products" routerLinkActive="active-link">
            <mat-icon matListItemIcon>inventory_2</mat-icon>
            <span matListItemTitle>Product Management</span>
          </a>
          <a mat-list-item routerLink="/inventory" routerLinkActive="active-link">
            <mat-icon matListItemIcon>warehouse</mat-icon>
            <span matListItemTitle>Inventory</span>
          </a>
          <a mat-list-item routerLink="/purchase-orders" routerLinkActive="active-link">
            <mat-icon matListItemIcon>shopping_cart</mat-icon>
            <span matListItemTitle>Purchase Order</span>
          </a>
          <a mat-list-item routerLink="/reports" routerLinkActive="active-link">
            <mat-icon matListItemIcon>bar_chart</mat-icon>
            <span matListItemTitle>Report & Analysis</span>
          </a>
          <a mat-list-item routerLink="/settings" routerLinkActive="active-link">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
        </mat-nav-list>

        <div class="sidebar-footer">
          <button mat-button class="logout-btn" (click)="confirmLogout()">
            <mat-icon>logout</mat-icon> Logout
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar class="top-bar">
          <div class="toolbar-spacer"></div>
          <button mat-icon-button class="tool-btn" routerLink="/notifications">
            <mat-icon>notifications</mat-icon>
            <span class="note-badge">5</span>
          </button>
          <div class="user-profile">
            <div class="user-info">
              <div class="u-name">Store Manager</div>
              <div class="u-role">Admin Access</div>
            </div>
            <div class="u-avatar">SM</div>
          </div>
        </mat-toolbar>
        
        <router-outlet></router-outlet>
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
  `]
})
export class MainLayoutComponent {
  private storage: StorageService = inject(StorageService);
  private router = inject(Router);

  confirmLogout() {
    if (confirm('Are you sure you want to logout?')) {
      this.storage.clean();
      this.router.navigate(['/login']);
    }
  }
}
