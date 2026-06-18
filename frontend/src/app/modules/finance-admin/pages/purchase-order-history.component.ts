import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-po-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="po-history">
      <div class="header-section">
        <h1 class="page-title">Purchase Order Management</h1>
        <div class="filters">
          <input type="text" [(ngModel)]="searchTerm" placeholder="Search POs..." (input)="filterPOs()">
          <select [(ngModel)]="statusFilter" (change)="filterPOs()">
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Product Name</th>
              <th>Supplier</th>
              <th>Total Amount</th>
              <th>Requested Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let po of filteredPOs">
              <td>#{{po.orderNumber}}</td>
              <td>{{po.items?.[0]?.productName || 'Bulk Order'}}</td>
              <td>{{po.supplier.name}}</td>
              <td>₹ {{formatPrice(po.totalAmount)}}</td>
              <td>{{po.orderDate | date:'mediumDate'}}</td>
              <td><span class="badge" [ngClass]="po.status.toLowerCase()">{{po.status}}</span></td>
              <td>
                <div class="action-buttons">
                  <button class="btn-approve" *ngIf="po.status === 'PENDING'" (click)="openApprovalModal(po)">Approve</button>
                  <button class="btn-reject" *ngIf="po.status === 'PENDING'" (click)="openRejectModal(po)">Reject</button>
                  <button class="btn-view" (click)="viewDetails(po)">Details</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content">
          <h3>{{modalType === 'approve' ? 'Approve' : 'Reject'}} Purchase Order</h3>
          <p>Reviewing PO #{{selectedPO.orderNumber}} from {{selectedPO.supplier.name}}</p>
          <div class="form-group">
            <label>Comments / Remarks</label>
            <textarea [(ngModel)]="remarks" placeholder="Enter reason for approval/rejection..."></textarea>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="closeModal()">Cancel</button>
            <button [class]="modalType === 'approve' ? 'btn-approve' : 'btn-reject'" (click)="confirmAction()">
              Confirm {{modalType === 'approve' ? 'Approval' : 'Rejection'}}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .po-history { display: flex; flex-direction: column; gap: 30px; }
    .header-section { display: flex; justify-content: space-between; align-items: center; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #1a202c; }
    
    .filters { display: flex; gap: 15px; }
    .filters input, .filters select { padding: 10px 15px; border-radius: 8px; border: 1px solid #e2e8f0; outline: none; }
    .filters input { width: 300px; }

    .table-card { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f8fafc; padding: 15px; text-align: left; color: #64748b; font-weight: 600; border-bottom: 1px solid #edf2f7; }
    td { padding: 18px 15px; border-bottom: 1px solid #f7fafc; }

    .badge { padding: 6px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge.pending { background: #fffbe6; color: #faad14; }
    .badge.approved { background: #f6ffed; color: #52c41a; }
    .badge.rejected { background: #fff1f0; color: #f5222d; }

    .action-buttons { display: flex; gap: 8px; }
    .btn-approve { background: #52c41a; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.3s; }
    .btn-reject { background: #ff4d4f; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.3s; }
    .btn-view { background: #f0f2f5; color: #2d3748; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: 0.3s; }
    .btn-approve:hover { background: #389e0d; }
    .btn-reject:hover { background: #cf1322; }

    /* Modal Styles */
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 16px; width: 450px; }
    .modal-content h3 { margin-bottom: 10px; }
    .form-group { margin: 20px 0; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; }
    .form-group textarea { width: 100%; height: 100px; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; resize: none; outline: none; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
    .btn-secondary { background: #e2e8f0; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
  `]
})
export class PurchaseOrderHistoryComponent implements OnInit {
  pos: any[] = [];
  filteredPOs: any[] = [];
  searchTerm: string = '';
  statusFilter: string = 'ALL';
  
  showModal: boolean = false;
  modalType: 'approve' | 'reject' = 'approve';
  selectedPO: any = null;
  remarks: string = '';

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadPOs();
  }

  loadPOs() {
    this.financeService.getPurchaseOrders().subscribe(data => {
      this.pos = data;
      this.filterPOs();
    });
  }

  formatPrice(value: number): string {
    return (value || 0).toLocaleString('en-IN');
  }

  filterPOs() {
    this.filteredPOs = this.pos.filter(po => {
      const matchesSearch = po.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          po.supplier.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'ALL' || po.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openApprovalModal(po: any) {
    this.selectedPO = po;
    this.modalType = 'approve';
    this.remarks = '';
    this.showModal = true;
  }

  openRejectModal(po: any) {
    this.selectedPO = po;
    this.modalType = 'reject';
    this.remarks = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmAction() {
    if (this.modalType === 'approve') {
      this.financeService.approvePO(this.selectedPO.id, this.remarks).subscribe(() => {
        this.loadPOs();
        this.closeModal();
      });
    } else {
      this.financeService.rejectPO(this.selectedPO.id, this.remarks).subscribe(() => {
        this.loadPOs();
        this.closeModal();
      });
    }
  }

  viewDetails(po: any) {
    // Details modal or navigation
    alert(`Showing details for PO #${po.orderNumber}`);
  }
}
