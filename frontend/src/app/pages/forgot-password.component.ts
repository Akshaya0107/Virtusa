import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Reset Password</h1>
          <p>Enter your email and we'll send you a link to reset your password.</p>
        </div>

        <form *ngIf="!submitted" (submit)="onSubmit()">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="name&#64;company.com">
          </div>

          <button type="submit" class="btn-submit" [disabled]="!email">Send Reset Link</button>
          
          <p class="back-link">
            <a routerLink="/login">Back to Login</a>
          </p>
        </form>

        <div *ngIf="submitted" class="success-state">
          <div class="success-icon">✉️</div>
          <h2>Check your email</h2>
          <p>We've sent a password reset link to <strong>{{ email }}</strong></p>
          <button class="btn-submit" routerLink="/login">Return to Login</button>
        </div>
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
      text-align: center;
    }

    .auth-header h1 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      color: #1e293b;
    }

    .auth-header p {
      color: #64748b;
      margin-bottom: 2rem;
    }

    .form-group {
      text-align: left;
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

    .back-link {
      margin-top: 1.5rem;
    }

    .back-link a {
      color: #64748b;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .success-state .success-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .success-state h2 {
      margin-bottom: 0.5rem;
    }

    .success-state p {
      color: #64748b;
      margin-bottom: 2rem;
    }
  `]
})
export class ForgotPasswordComponent {
  email = '';
  submitted = false;

  constructor(private api: ApiService) {}

  onSubmit() {
    this.api.post('/auth/forgot-password?email=' + this.email, {}).subscribe({
      next: () => {
        this.submitted = true;
      }
    });
  }
}
