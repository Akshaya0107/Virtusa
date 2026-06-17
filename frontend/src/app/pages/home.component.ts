import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <nav class="navbar">
        <div class="logo">SupplySync</div>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/about">About</a>
          <a routerLink="/contact">Contact</a>
          <a routerLink="/login" class="btn-login">Login</a>
          <a routerLink="/signup" class="btn-signup">Sign Up</a>
        </div>
      </nav>

      <main class="hero">
        <div class="hero-content">
          <h1>Sync Your Supply Chain with Precision</h1>
          <p>The ultimate platform for store managers, warehouse staff, and suppliers to collaborate in real-time.</p>
          <div class="cta-buttons">
            <a routerLink="/signup" class="btn-primary">Get Started</a>
            <a routerLink="/about" class="btn-secondary">Learn More</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" alt="Warehouse">
        </div>
      </main>

      <section class="features">
        <div class="feature-card">
          <i class="icon">📦</i>
          <h3>Inventory Tracking</h3>
          <p>Real-time updates on stock levels across all locations.</p>
        </div>
        <div class="feature-card">
          <i class="icon">🚚</i>
          <h3>Supplier Portal</h3>
          <p>Seamless communication and order management with your suppliers.</p>
        </div>
        <div class="feature-card">
          <i class="icon">📊</i>
          <h3>Analytics</h3>
          <p>Insightful reports to optimize your supply chain efficiency.</p>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 SupplySync. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      font-family: 'Inter', sans-serif;
      color: #333;
      line-height: 1.6;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 5%;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 800;
      color: #2563eb;
      letter-spacing: -1px;
    }

    .nav-links a {
      margin-left: 2rem;
      text-decoration: none;
      color: #4b5563;
      font-weight: 500;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: #2563eb;
    }

    .btn-signup {
      background: #2563eb;
      color: #fff !important;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
    }

    .hero {
      display: flex;
      align-items: center;
      padding: 5rem 5%;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      min-height: 80vh;
    }

    .hero-content {
      flex: 1;
      padding-right: 4rem;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 800;
      color: #1e3a8a;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .hero-content p {
      font-size: 1.25rem;
      color: #475569;
      margin-bottom: 2.5rem;
    }

    .cta-buttons a {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      margin-right: 1rem;
      transition: transform 0.2s;
    }

    .cta-buttons a:hover {
      transform: translateY(-2px);
    }

    .btn-primary {
      background: #2563eb;
      color: #fff;
      box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    }

    .btn-secondary {
      background: #fff;
      color: #2563eb;
      border: 2px solid #2563eb;
    }

    .hero-image {
      flex: 1;
    }

    .hero-image img {
      width: 100%;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2.5rem;
      padding: 6rem 5%;
    }

    .feature-card {
      padding: 3rem;
      background: #fff;
      border-radius: 20px;
      text-align: center;
      transition: box-shadow 0.3s;
      border: 1px solid #e2e8f0;
    }

    .feature-card:hover {
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }

    .feature-card .icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      display: block;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #1e293b;
    }

    footer {
      padding: 3rem;
      text-align: center;
      background: #1e293b;
      color: #94a3b8;
    }

    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
        text-align: center;
        padding-top: 3rem;
      }
      .hero-content {
        padding-right: 0;
        margin-bottom: 3rem;
      }
      .hero-content h1 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HomeComponent {}
