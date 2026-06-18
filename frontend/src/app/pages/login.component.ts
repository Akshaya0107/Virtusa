import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo" routerLink="/">SupplySync</div>
          <h1>Welcome Back</h1>
          <p>Login to your account to continue</p>
        </div>

        <form (submit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label>Email Address</label>
            <div class="input-wrapper">
              <span class="icon">📧</span>
              <input type="email" [(ngModel)]="credentials.email" name="email" required placeholder="name&#64;company.com">
            </div>
          </div>

          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <span class="icon">🔒</span>
              <input [type]="showPassword ? 'text' : 'password'" [(ngModel)]="credentials.password" name="password" required placeholder="••••••••">
              <button type="button" class="btn-toggle" (click)="showPassword = !showPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="form-footer">
            <label class="remember-me">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe"> Remember Me
            </label>
            <a routerLink="/forgot-password" class="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" class="btn-submit" [disabled]="loading || !loginForm.form.valid">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>

          <div *ngIf="error" class="error-msg">{{ error }}</div>

          <p class="signup-prompt">
            Don't have an account? <a routerLink="/signup">Sign Up</a>
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
      background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
      font-family: 'Inter', sans-serif;
      padding: 2rem;
    }

    .auth-card {
      background: #fff;
      width: 100%;
      max-width: 450px;
      padding: 3rem;
      border-radius: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 800;
      color: #2563eb;
      margin-bottom: 1.5rem;
      cursor: pointer;
    }

    .auth-header h1 {
      font-size: 1.75rem;
      color: #102a43;
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      color: #627d98;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #486581;
      font-weight: 500;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrapper .icon {
      position: absolute;
      left: 1rem;
      color: #9fb3c8;
    }

    .input-wrapper input {
      width: 100%;
      padding: 0.85rem 1rem 0.85rem 3rem;
      border: 2px solid #f0f4f8;
      border-radius: 12px;
      background: #f8fafc;
      transition: all 0.2s;
    }

    .input-wrapper input:focus {
      outline: none;
      border-color: #2563eb;
      background: #fff;
    }

    .btn-toggle {
      position: absolute;
      right: 1rem;
      background: none;
      border: none;
      color: #2563eb;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }

    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .remember-me {
      color: #486581;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .forgot-link {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
    }

    .btn-submit:hover:not(:disabled) {
      background: #1d4ed8;
      transform: translateY(-1px);
    }

    .btn-submit:disabled {
      background: #9fb3c8;
      cursor: not-allowed;
    }

    .error-msg {
      margin-top: 1rem;
      color: #ef4444;
      text-align: center;
      font-size: 0.9rem;
    }

    .signup-prompt {
      margin-top: 2rem;
      text-align: center;
      color: #627d98;
    }

    .signup-prompt a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  showPassword = false;
  rememberMe = false;
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.credentials).subscribe({
      next: (user) => {
        const roles = user.roles || [];
        if (roles.includes('ROLE_WAREHOUSE')) {
          this.router.navigate(['/warehouse/dashboard']);
        } else if (roles.includes('ROLE_SUPPLIER')) {
          this.router.navigate(['/supplier/dashboard']);
        } else if (roles.includes('ROLE_FINANCE_ADMIN')) {
          this.router.navigate(['/finance/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.error = 'Invalid email or password. Please try again.';
        this.loading = false;
      }
    });
  }
}
