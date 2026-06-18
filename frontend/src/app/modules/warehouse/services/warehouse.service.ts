import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WarehouseDashboardStats {
  totalProductsReceived: number;
  currentStockAvailable: number;
  lowStockProducts: number;
  todayDispatches: number;
  notifications: any[];
}

export interface StockReceipt {
  id?: number;
  productId: number;
  productName?: string;
  supplierId?: number;
  supplierName?: string;
  quantityReceived: number;
  batchNumber: string;
  conditionStatus: string;
  qrCode: string;
  receivedDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private http = inject(HttpClient);
  private apiUrl = '/api/warehouse';

  getDashboardStats(): Observable<WarehouseDashboardStats> {
    return this.http.get<WarehouseDashboardStats>(`${this.apiUrl}/dashboard`);
  }

  receiveStock(receipt: StockReceipt): Observable<StockReceipt> {
    return this.http.post<StockReceipt>(`${this.apiUrl}/receipts`, receipt);
  }

  getReceipts(): Observable<StockReceipt[]> {
    return this.http.get<StockReceipt[]>(`${this.apiUrl}/receipts`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('/api/products');
  }

  getInventory(): Observable<any[]> {
    return this.http.get<any[]>('/api/inventory');
  }
}
