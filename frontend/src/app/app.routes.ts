import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password.component';

import { MainLayoutComponent } from './modules/store-manager/pages/main-layout.component';
import { DashboardComponent } from './modules/store-manager/pages/dashboard.component';
import { ProductManagementComponent } from './modules/store-manager/pages/product-management.component';
import { InventoryComponent } from './modules/store-manager/pages/inventory.component';
import { PurchaseOrderComponent } from './modules/store-manager/pages/purchase-order.component';
import { ReportsComponent } from './modules/store-manager/pages/reports.component';
import { ReportAnalysisComponent } from './modules/store-manager/pages/report-analysis.component';
import { NotificationsComponent } from './modules/store-manager/pages/notifications.component';
import { SettingsComponent } from './modules/store-manager/pages/settings.component';

export const routes: Routes = [
  // Public Routes
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

  // Protected Store Manager Routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'purchase-orders', component: PurchaseOrderComponent },
      { path: 'reports', component: ReportAnalysisComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
