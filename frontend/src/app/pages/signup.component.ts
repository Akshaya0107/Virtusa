import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo" routerLink="/">SupplySync</div>
          <h1>Create Account</h1>
          <p>Join the SupplySync ecosystem today</p>
        </div>

        <form (submit)="onSignup()" #signupForm="ngForm">
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" [(ngModel)]="user.fullName" name="fullName" required placeholder="John Doe">
            </div>

            <div class="form-group">
              <label>Email Address</label>
              <input type="email" [(ngModel)]="user.email" name="email" required placeholder="john&#64;example.com">
            </div>

            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" [(ngModel)]="user.phone" name="phone" placeholder="+1 (555) 000-0000">
            </div>

            <div class="form-group">
              <label>Role</label>
              <select [(ngModel)]="user.role" name="role" required>
                <option value="manager">Store Manager</option>
                <option value="warehouse">Warehouse Staff</option>
                <option value="supplier">Supplier</option>
                <option value="admin">Finance Admin</option>
              </select>
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" [(ngModel)]="user.password" name="password" required placeholder="Min. 8 characters">
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" required placeholder="Repeat password">
            </div>
          </div>

          <button type="submit" class="btn-submit" [disabled]="loading || !signupForm.form.valid || user.password !== confirmPassword">
            {{ loading ? 'Creating Account...' : 'Sign Up' }}
          </button>

          <div *ngIf="error" class="error-msg">{{ error }}</div>
          <div *ngIf="user.password && confirmPassword && user.password !== confirmPassword" class="error-msg">Passwords do not match</div>

          <p class="login-prompt">
            Already have an account? <a routerLink="/login">Login</a>
          </p>
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
      background: #f1f5f9;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
    }

    .auth-card {
      background: #fff;
      width: 100%;
      max-width: 600px;
      padding: 3rem;
      border-radius: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    .auth-header h1 {
      font-size: 1.75rem;
      color: #1e293b;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #475569;
      font-weight: 500;
    }

    .form-group input, .form-group select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #f8fafc;
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 1rem;
    }

    .btn-submit:disabled {
      background: #cbd5e1;
    }

    .error-msg {
      color: #ef4444;
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    .login-prompt {
      text-align: center;
      margin-top: 2rem;
      color: #64748b;
    }

    .login-prompt a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
    }

    @media (max-width: 600px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SignupComponent {
  user = { fullName: '', email: '', phone: '', role: 'manager', password: '', roles: [] as string[] };
  confirmPassword = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    this.loading = true;
    this.error = '';
    
    // Map internal role to API role array
    this.user.roles = [this.user.role];
    
    this.auth.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Registration failed. Email might already be in use.';
        this.loading = false;
      }
    });
  }
}
