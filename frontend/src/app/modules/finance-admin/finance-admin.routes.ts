import { Routes } from '@angular/router';
import { FinanceMainLayoutComponent } from './layouts/main-layout.component';
import { FinanceDashboardComponent } from './pages/dashboard.component';
import { PurchaseOrderHistoryComponent } from './pages/purchase-order-history.component';
import { FinanceReportsComponent } from './pages/reports.component';
import { CostAnalysisComponent } from './pages/cost-analysis.component';
import { SupplierTrackingComponent } from './pages/supplier-cost-tracking.component';
import { AuditLogsComponent } from './pages/audit-logs.component';
import { FinanceSettingsComponent } from './pages/settings.component';

export const FINANCE_ROUTES: Routes = [
  {
    path: '',
    component: FinanceMainLayoutComponent,
    children: [
      { path: 'dashboard', component: FinanceDashboardComponent },
      { path: 'purchase-orders', component: PurchaseOrderHistoryComponent },
      { path: 'reports', component: FinanceReportsComponent },
      { path: 'cost-analysis', component: CostAnalysisComponent },
      { path: 'supplier-tracking', component: SupplierTrackingComponent },
      { path: 'audit-logs', component: AuditLogsComponent },
      { path: 'settings', component: FinanceSettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
