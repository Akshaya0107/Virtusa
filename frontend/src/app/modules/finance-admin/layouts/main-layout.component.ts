import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinanceSidebarComponent } from '../components/sidebar.component';
import { FinanceHeaderComponent } from '../components/header.component';

@Component({
  selector: 'app-finance-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FinanceSidebarComponent, FinanceHeaderComponent],
  template: `
    <div class="layout-wrapper">
      <app-finance-sidebar></app-finance-sidebar>
      <div class="main-content">
        <app-finance-header></app-finance-header>
        <div class="page-body">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      min-height: 100vh;
      background: #f4f7f6;
    }
    .main-content {
      margin-left: 260px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .page-body {
      padding: 40px;
      flex: 1;
    }
  `]
})
export class FinanceMainLayoutComponent {}
