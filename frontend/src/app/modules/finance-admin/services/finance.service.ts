import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = '/api/finance';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  getPurchaseOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/purchase-orders`);
  }

  approvePO(id: number, comments: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/purchase-orders/${id}/approve`, { comments });
  }

  rejectPO(id: number, comments: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/purchase-orders/${id}/reject`, { comments });
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reports`);
  }

  generateReport(type: string): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/reports/${type}`, {}, { responseType: 'blob' });
  }

  getCostAnalysis(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cost-analysis`);
  }

  getCategorySpending(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cost-analysis/categories`);
  }

  getSupplierCosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/suppliers/costs`);
  }

  getSupplierPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/suppliers/payments`);
  }

  getBudget(): Observable<any> {
    return this.http.get(`${this.apiUrl}/budget`);
  }

  getAuditLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/audit-logs`);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications`);
  }
}
