import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="about-container">
      <nav class="navbar">
        <div class="logo">SupplySync</div>
        <div class="nav-links">
          <a routerLink="/">Home</a>
          <a routerLink="/about">About</a>
          <a routerLink="/contact">Contact</a>
          <a routerLink="/login" class="btn-login">Login</a>
        </div>
      </nav>

      <section class="about-hero">
        <h1>Transforming Supply Chain Management</h1>
        <p>Our mission is to bridge the gap between supply and demand with cutting-edge technology.</p>
      </section>

      <section class="content">
        <div class="card">
          <h2>Our Vision</h2>
          <p>We believe in a world where every retail business, regardless of size, has access to the same sophisticated supply chain tools as global giants. SupplySync is built to democratize efficiency and transparency.</p>
        </div>
        <div class="card">
          <h2>Who We Serve</h2>
          <ul>
            <li><strong>Store Managers:</strong> Real-time inventory and automated ordering.</li>
            <li><strong>Warehouse Staff:</strong> Optimized picking, packing, and shipping workflows.</li>
            <li><strong>Suppliers:</strong> Direct visibility into demand and seamless fulfillment.</li>
            <li><strong>Finance Teams:</strong> Transparent audit trails and financial reporting.</li>
          </ul>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 SupplySync. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .about-container {
      font-family: 'Inter', sans-serif;
      color: #333;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 5%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
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
      font-weight: 500;
    }

    .about-hero {
      background: #1e3a8a;
      color: #fff;
      padding: 6rem 5%;
      text-align: center;
    }

    .about-hero h1 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }

    .about-hero p {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto;
      opacity: 0.9;
    }

    .content {
      padding: 5rem 5%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: #f8fafc;
      padding: 3rem;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
    }

    .card h2 {
      color: #1e3a8a;
      margin-bottom: 1.5rem;
    }

    .card ul {
      list-style: none;
      padding: 0;
    }

    .card li {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .card li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #2563eb;
      font-weight: bold;
    }

    footer {
      padding: 3rem;
      text-align: center;
      background: #f1f5f9;
      margin-top: 5rem;
    }

    @media (max-width: 768px) {
      .content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {}
