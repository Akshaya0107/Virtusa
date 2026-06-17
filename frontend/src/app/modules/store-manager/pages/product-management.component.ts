import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, 
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatCardModule, MatChipsModule, MatMenuModule
  ],
  template: `
    <div class="product-container">
      <header class="page-header">
        <div class="title-group">
          <h1>Product Management</h1>
          <p>Maintain your product catalog and inventory links</p>
        </div>
        <div class="action-buttons">
          <button mat-stroked-button color="primary" class="qr-btn" (click)="toggleScanner()">
            <mat-icon>qr_code_scanner</mat-icon> {{ showScanner ? 'Close Scanner' : 'Open QR Scanner' }}
          </button>
          <button mat-raised-button color="primary" class="add-btn" (click)="toggleForm()">
            <mat-icon>add</mat-icon> Add Product
          </button>
        </div>
      </header>

      <!-- QR Scanner Section -->
      <mat-card *ngIf="showScanner" class="scanner-card animated fadeIn">
        <div class="scanner-view">
          <div class="scanner-overlay">
            <div class="scan-frame"></div>
            <div class="scan-line"></div>
          </div>
          <video #video autoplay class="camera-feed"></video>
          <div class="scanner-status">Align QR code within the frame</div>
        </div>
      </mat-card>

      <!-- Add Product Form -->
      <mat-card *ngIf="showForm" class="form-card animated slideInDown">
        <mat-card-header>
          <mat-card-title>Add New Product</mat-card-title>
        </mat-card-header>
        <form (submit)="saveProduct()" #productForm="ngForm" class="product-form">
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Product Name</mat-label>
              <input matInput [(ngModel)]="newProduct.name" name="name" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Brand</mat-label>
              <input matInput [(ngModel)]="newProduct.brand" name="brand" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Category</mat-label>
              <mat-select [(ngModel)]="newProduct.categoryId" name="categoryId" required>
                <mat-option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>SKU ID</mat-label>
              <input matInput [(ngModel)]="newProduct.sku" name="sku" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Price (₹)</mat-label>
              <input matInput type="number" [(ngModel)]="newProduct.price" name="price" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Initial Quantity</mat-label>
              <input matInput type="number" [(ngModel)]="newProduct.quantity" name="quantity" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Supplier</mat-label>
              <mat-select [(ngModel)]="newProduct.supplierId" name="supplierId">
                <mat-option *ngFor="let sup of suppliers" [value]="sup.id">{{ sup.name }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>QR Code</mat-label>
              <input matInput [(ngModel)]="newProduct.qrCode" name="qrCode">
              <button mat-icon-button matSuffix (click)="toggleScanner()"><mat-icon>camera_alt</mat-icon></button>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput [(ngModel)]="newProduct.description" name="description" rows="3"></textarea>
          </mat-form-field>

          <div class="form-actions">
            <button mat-button type="button" (click)="toggleForm()">Cancel</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="!productForm.valid">Save Product</button>
          </div>
        </form>
      </mat-card>

      <!-- Tables and Filters -->
      <mat-card class="table-card">
        <div class="table-header">
          <mat-form-field appearance="outline" class="search-box">
            <mat-icon matPrefix>search</mat-icon>
            <mat-label>Search products...</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, category or brand">
          </mat-form-field>
          
          <div class="filter-chips">
            <mat-chip-listbox>
              <mat-chip-option (click)="filterByCategory(null)" selected>All</mat-chip-option>
              <mat-chip-option *ngFor="let cat of categories" (click)="filterByCategory(cat.id)">{{ cat.name }}</mat-chip-option>
            </mat-chip-listbox>
          </div>
        </div>

        <div class="table-container">
          <table mat-table [dataSource]="products" class="custom-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let p"> {{ p.id }} </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Product </th>
              <td mat-cell *matCellDef="let p">
                <div class="product-cell">
                  <div class="product-info">
                    <div class="p-name">{{ p.name }}</div>
                    <div class="p-sku">{{ p.sku }}</div>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="brand">
              <th mat-header-cell *matHeaderCellDef> Brand </th>
              <td mat-cell *matCellDef="let p"> {{ p.brand || 'N/A' }} </td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef> Category </th>
              <td mat-cell *matCellDef="let p"> {{ p.categoryName }} </td>
            </ng-container>

            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef> Stock </th>
              <td mat-cell *matCellDef="let p">
                <span class="stock-badge" [ngClass]="getStockClass(p.quantity)">
                  {{ p.quantity }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef> Price </th>
              <td mat-cell *matCellDef="let p"> ₹{{ p.price | number }} </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let p">
                <span class="status-dot" [style.background]="p.quantity > 0 ? '#22c55e' : '#ef4444'"></span>
                {{ p.quantity > 0 ? 'Active' : 'Out of Stock' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let p">
                <button mat-icon-button [matMenuTriggerFor]="itemMenu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #itemMenu="matMenu">
                  <button mat-menu-item (click)="viewProduct(p)"><mat-icon>visibility</mat-icon> View</button>
                  <button mat-menu-item (click)="editProduct(p)"><mat-icon>edit</mat-icon> Edit</button>
                  <button mat-menu-item color="warn" (click)="deleteProduct(p.id)"><mat-icon>delete</mat-icon> Delete</button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .product-container { padding: 30px; background: #f1f5f9; min-height: 100vh; }
    .page-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 25px; }
    .title-group h1 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }
    .title-group p { color: #64748b; margin-top: 4px; }
    
    .action-buttons { display: flex; gap: 12px; }
    .qr-btn { border-radius: 12px; height: 48px; }
    .add-btn { border-radius: 12px; height: 48px; font-weight: 600; }

    .scanner-card { margin-bottom: 25px; background: #000; overflow: hidden; padding: 0; }
    .scanner-view { position: relative; height: 350px; display: flex; align-items: center; justify-content: center; }
    .camera-feed { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
    .scanner-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 2; }
    .scan-frame { width: 200px; height: 200px; border: 2px solid #3b82f6; border-radius: 20px; box-shadow: 0 0 0 1000px rgba(0,0,0,0.5); }
    .scan-line { position: absolute; width: 200px; height: 2px; background: #3b82f6; top: 75px; animation: scan 2s infinite ease-in-out; }
    @keyframes scan { 0%, 100% { top: 75px; } 50% { top: 275px; } }
    .scanner-status { position: absolute; bottom: 20px; color: white; background: rgba(0,0,0,0.6); padding: 8px 16px; border-radius: 20px; font-size: 0.85rem; }

    .form-card { margin-bottom: 30px; border-radius: 16px; border: none; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
    .product-form { padding: 20px; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .full-width { width: 100%; }
    .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px; }

    .table-card { border-radius: 16px; border: none; padding: 0; overflow: hidden; }
    .table-header { padding: 20px; border-bottom: 1px solid #e2e8f0; }
    .search-box { width: 100%; max-width: 500px; margin-bottom: 15px; }
    .filter-chips { margin-top: 10px; }

    .table-container { overflow-x: auto; }
    .custom-table { width: 100%; }
    th { background: #f8fafc; padding: 16px; font-weight: 600; color: #475569; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
    td { padding: 16px; font-size: 0.9rem; color: #1e293b; }
    
    .product-cell { display: flex; align-items: center; gap: 12px; }
    .p-name { font-weight: 600; color: #1e293b; }
    .p-sku { font-size: 0.75rem; color: #64748b; }
    
    .stock-badge { padding: 4px 10px; border-radius: 6px; font-weight: 700; font-size: 0.75rem; }
    .stock-ok { background: #dcfce7; color: #166534; }
    .stock-low { background: #fef3c7; color: #92400e; }
    .stock-empty { background: #fee2e2; color: #991b1b; }
    
    .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }

    .animated { animation-duration: 0.4s; animation-fill-mode: both; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideInDown { from { transform: translate3d(0, -20px, 0); opacity: 0; } to { transform: translate3d(0, 0, 0); opacity: 1; } }
    .fadeIn { animation-name: fadeIn; }
    .slideInDown { animation-name: slideInDown; }
  `]
})
export class ProductManagementComponent implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  products: any[] = [];
  categories: any[] = [];
  suppliers: any[] = [];
  displayedColumns = ['id', 'name', 'brand', 'category', 'stock', 'price', 'status', 'actions'];

  showForm = false;
  showScanner = false;
  newProduct: any = {};

  ngOnInit() {
    this.loadData();
    this.loadLookups();
  }

  loadData() {
    this.http.get<any[]>('/api/products').subscribe(data => this.products = data);
  }

  loadLookups() {
    this.http.get<any[]>('/api/categories').subscribe(data => this.categories = data);
    this.http.get<any[]>('/api/suppliers').subscribe(data => this.suppliers = data);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.newProduct = {};
  }

  toggleScanner() {
    this.showScanner = !this.showScanner;
    if (this.showScanner) {
      // Logic to start camera would go here
    }
  }

  saveProduct() {
    this.http.post('/api/products', this.newProduct).subscribe(() => {
      this.loadData();
      this.showForm = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
      this.http.get<any[]>(`/api/products/search?keyword=${filterValue}`).subscribe(data => this.products = data);
    } else if (filterValue === '') {
      this.loadData();
    }
  }

  filterByCategory(catId: any) {
    // Implementation for category filtering
  }

  getStockClass(q: number) {
    if (q <= 0) return 'stock-empty';
    if (q <= 10) return 'stock-low';
    return 'stock-ok';
  }

  viewProduct(p: any) { console.log('View', p); }
  editProduct(p: any) { 
    this.newProduct = { ...p };
    this.showForm = true;
  }
  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.http.delete(`/api/products/${id}`).subscribe(() => this.loadData());
    }
  }
}
