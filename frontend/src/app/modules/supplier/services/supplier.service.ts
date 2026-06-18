import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SupplierDashboardStats {
  assignedOrders: number;
  pendingDeliveries: number;
  completedDeliveries: number;
  upcomingDeliveries: number;
  notifications: any[];
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private http = inject(HttpClient);
  private apiUrl = '/api/supplier';

  getDashboardStats(supplierId: number): Observable<SupplierDashboardStats> {
    return this.http.get<SupplierDashboardStats>(`${this.apiUrl}/dashboard/${supplierId}`);
  }

  getPurchaseOrders(supplierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/purchase-orders/${supplierId}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/purchase-orders/${orderId}/status?status=${status}`, {});
  }

  confirmETA(etaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/eta`, etaData);
  }

  getDeliveryHistory(supplierId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/delivery-history/${supplierId}`);
  }
}
