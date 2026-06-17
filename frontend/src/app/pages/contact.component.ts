import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="contact-page">
      <nav class="navbar">
        <div class="logo">SupplySync</div>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/about">About</a>
          <a routerLink="/contact">Contact</a>
        </div>
      </nav>

      <div class="container">
        <div class="contact-info">
          <h1>Get in Touch</h1>
          <p>Have questions about SupplySync? We're here to help you optimize your business.</p>
          
          <div class="info-blocks">
            <div class="block">
              <span class="icon">📍</span>
              <div>
                <strong>Office</strong>
                <p>123 Logistics Way, Tech City</p>
              </div>
            </div>
            <div class="block">
              <span class="icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>support&#64;supplysync.com</p>
              </div>
            </div>
          </div>
        </div>

        <div class="form-card">
          <form (submit)="onSubmit()" #contactForm="ngForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" [(ngModel)]="contactData.name" name="name" required placeholder="Your Name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" [(ngModel)]="contactData.email" name="email" required placeholder="your&#64;email.com">
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input type="text" [(ngModel)]="contactData.subject" name="subject" required placeholder="How can we help?">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea [(ngModel)]="contactData.message" name="message" required rows="5" placeholder="Tell us more..."></textarea>
            </div>
            <button type="submit" class="btn-submit" [disabled]="!contactForm.form.valid">Send Message</button>
            <p *ngIf="submitted" class="success-msg">Thank you! Your message has been sent.</p>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      background: #f8fafc;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 5%;
      background: #fff;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: #2563eb;
    }

    .nav-links a {
      margin-left: 2rem;
      text-decoration: none;
      color: #4b5563;
    }

    .container {
      max-width: 1100px;
      margin: 4rem auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      padding: 0 2rem;
    }

    .contact-info h1 {
      font-size: 3rem;
      color: #1e293b;
      margin-bottom: 1.5rem;
    }

    .contact-info p {
      color: #64748b;
      font-size: 1.1rem;
      margin-bottom: 3rem;
    }

    .info-blocks .block {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .info-blocks .icon {
      font-size: 1.5rem;
      background: #fff;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    .form-card {
      background: #fff;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #334155;
    }

    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-submit:hover {
      background: #1d4ed8;
    }

    .btn-submit:disabled {
      background: #94a3b8;
      cursor: not-allowed;
    }

    .success-msg {
      margin-top: 1.5rem;
      color: #059669;
      font-weight: 500;
      text-align: center;
    }

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactData = { name: '', email: '', subject: '', message: '' };
  submitted = false;

  constructor(private api: ApiService) {}

  onSubmit() {
    this.api.post('/contact', this.contactData).subscribe({
      next: () => {
        this.submitted = true;
        this.contactData = { name: '', email: '', subject: '', message: '' };
      }
    });
  }
}
