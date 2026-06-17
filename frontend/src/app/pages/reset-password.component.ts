import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Set New Password</h1>
          <p>Please enter your new password below.</p>
        </div>

        <form (submit)="onSubmit()" #resetForm="ngForm">
          <div class="form-group">
            <label>New Password</label>
            <input type="password" [(ngModel)]="password" name="password" required minlength="8" placeholder="••••••••">
          </div>

          <div class="form-group">
            <label>Confirm New Password</label>
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required placeholder="••••••••">
          </div>

          <button type="submit" class="btn-submit" [disabled]="!resetForm.form.valid || password !== confirmPassword">
            Update Password
          </button>
          
          <div *ngIf="password && confirmPassword && password !== confirmPassword" class="error-msg">
            Passwords do not match
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
    }

    .auth-card {
      background: #fff;
      width: 100%;
      max-width: 400px;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .auth-header h1 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      color: #1e293b;
      text-align: center;
    }

    .auth-header p {
      color: #64748b;
      margin-bottom: 2rem;
      text-align: center;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }

    .btn-submit {
      width: 100%;
      padding: 0.85rem;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .error-msg {
      color: #ef4444;
      font-size: 0.85rem;
      margin-top: 1rem;
      text-align: center;
    }
  `]
})
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';
  token = '';

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.token = this.route.snapshot.queryParams['token'] || '';
  }

  onSubmit() {
    this.api.post(`/auth/reset-password?token=${this.token}&newPassword=${this.password}`, {}).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
