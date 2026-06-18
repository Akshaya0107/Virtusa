import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-warehouse-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, 
    MatListModule, MatIconModule, MatButtonModule, MatToolbarModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidebar">
        <div class="logo-container">
          <div class="logo-glow"></div>
          <span class="logo-text">SupplySync</span>
          <span class="role-badge">Warehouse Staff</span>
        </div>

        <mat-nav-list class="nav-list">
          <a mat-list-item routerLink="dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="stock-receipt" routerLinkActive="active-link">
            <mat-icon matListItemIcon>input</mat-icon>
            <span matListItemTitle>Stock Receipt Entry</span>
          </a>
          <a mat-list-item routerLink="inventory-updates" routerLinkActive="active-link">
            <mat-icon matListItemIcon>inventory</mat-icon>
            <span matListItemTitle>Inventory Updates</span>
          </a>
          <a mat-list-item routerLink="stock-count" routerLinkActive="active-link">
            <mat-icon matListItemIcon>fact_check</mat-icon>
            <span matListItemTitle>Stock Count</span>
          </a>
          <a mat-list-item routerLink="dispatch-tracking" routerLinkActive="active-link">
            <mat-icon matListItemIcon>local_shipping</mat-icon>
            <span matListItemTitle>Dispatch Tracking</span>
          </a>
        </mat-nav-list>

        <div class="sidebar-footer">
          <a mat-list-item routerLink="settings" routerLinkActive="active-link">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
          <button mat-button class="logout-btn" (click)="confirmLogout()">
            <mat-icon>logout</mat-icon> Logout
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <mat-toolbar class="top-bar">
          <div class="search-bar">
            <mat-icon>search</mat-icon>
            <input type="text" placeholder="Search orders, products...">
          </div>
          <div class="toolbar-spacer"></div>
          <button mat-icon-button class="tool-btn">
            <mat-icon>notifications</mat-icon>
            <span class="note-badge">4</span>
          </button>
          <div class="user-profile">
            <div class="user-info">
              <div class="u-name">Warehouse Pro</div>
              <div class="u-role">Staff #4402</div>
            </div>
            <div class="u-avatar">WS</div>
          </div>
        </mat-toolbar>
        
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; background: #f4f7fa; }
    .sidebar { width: 280px; background: #0b1120; color: white; border: none; display: flex; flex-direction: column; }
    
    .logo-container { padding: 40px 25px; position: relative; text-align: center; }
    .logo-text { font-size: 1.8rem; font-weight: 800; letter-spacing: -1px; background: linear-gradient(135deg, #2dd4bf, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .role-badge { display: block; font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 2.5px; margin-top: 8px; font-weight: 600; }
    .logo-glow { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 80px; height: 80px; background: #2dd4bf; filter: blur(70px); opacity: 0.1; }

    .nav-list { padding: 10px 15px; flex: 1; }
    mat-list-item { height: 50px !important; margin-bottom: 8px; border-radius: 12px !important; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); color: #94a3b8 !important; }
    mat-list-item:hover { background: rgba(255,255,255,0.05) !important; color: white !important; }
    .active-link { background: linear-gradient(90deg, #1e293b, #334155) !important; color: #2dd4bf !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .active-link mat-icon { color: #2dd4bf !important; }
    
    .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
    .logout-btn { width: 100%; height: 48px; border-radius: 12px; color: #f87171 !important; background: rgba(239, 68, 68, 0.08); font-weight: 600; margin-top: 10px; }
    .logout-btn:hover { background: rgba(239, 68, 68, 0.15); }

    .top-bar { background: white; border-bottom: 1px solid #e2e8f0; color: #1e293b; height: 75px; padding: 0 35px; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .search-bar { display: flex; align-items: center; background: #f1f5f9; padding: 8px 20px; border-radius: 12px; width: 350px; }
    .search-bar input { border: none; background: transparent; outline: none; margin-left: 10px; font-size: 0.9rem; width: 100%; }
    .toolbar-spacer { flex: 1; }
    .tool-btn { position: relative; margin-right: 25px; color: #64748b; }
    .note-badge { position: absolute; top: 6px; right: 6px; background: #0ea5e9; color: white; font-size: 10px; padding: 1px 4px; border-radius: 6px; border: 2px solid white; }
    
    .user-profile { display: flex; align-items: center; gap: 15px; cursor: pointer; }
    .user-info { text-align: right; }
    .u-name { font-weight: 700; color: #0f172a; font-size: 0.95rem; line-height: 1.2; }
    .u-role { font-size: 0.75rem; color: #94a3b8; }
    .u-avatar { width: 44px; height: 44px; background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; box-shadow: 0 4px 10px rgba(14, 165, 233, 0.2); }
    
    .page-content { padding: 35px; min-height: calc(100vh - 75px); overflow-y: auto; }
  `]
})
export class WarehouseMainLayoutComponent {
  private storage = inject(StorageService);
  private router = inject(Router);

  confirmLogout() {
    if (confirm('Verify: Logout from SupplySync Warehouse System?')) {
      this.storage.clean();
      this.router.navigate(['/login']);
    }
  }
}
