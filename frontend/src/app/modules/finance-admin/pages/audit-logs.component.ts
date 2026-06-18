import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../services/finance.service';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="audit-logs">
      <h1 class="page-title">System Audit Logs</h1>

      <div class="summary-row">
        <div class="sum-card">
          <h4>Total Activities</h4>
          <span class="val">{{logs.length}}</span>
        </div>
        <div class="sum-card">
          <h4>Security Alerts</h4>
          <span class="val red">0</span>
        </div>
        <div class="sum-card">
          <h4>Today's Logins</h4>
          <span class="val blue">12</span>
        </div>
      </div>

      <div class="logs-container">
        <div class="logs-header">
          <h3>Activity Stream</h3>
          <div class="actions">
            <button class="btn-outline">Export Logs</button>
            <input type="text" placeholder="Filter by user or action...">
          </div>
        </div>

        <div class="log-list">
          <div class="log-entry" *ngFor="let log of logs">
            <div class="log-time">
              <strong>{{log.timestamp | date:'shortTime'}}</strong>
              <span>{{log.timestamp | date:'MMM d'}}</span>
            </div>
            <div class="log-icon" [ngClass]="getIconClass(log.action)">
              <i class="icon">{{getIcon(log.action)}}</i>
            </div>
            <div class="log-content">
              <p class="log-action"><strong>{{log.adminName}}</strong> {{log.description}}</p>
              <div class="log-meta">
                <span>Action: {{log.action}}</span>
                <span>ID: #{{log.id}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .audit-logs { display: flex; flex-direction: column; gap: 35px; }
    .page-title { font-size: 1.8rem; font-weight: 700; color: #1e293b; }

    .summary-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .sum-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
    .sum-card h4 { margin: 0 0 10px 0; color: #64748b; font-size: 0.9rem; }
    .sum-card .val { font-size: 1.8rem; font-weight: 800; }
    .sum-card .val.red { color: #ef4444; }
    .sum-card .val.blue { color: #3b82f6; }

    .logs-container { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); padding: 30px; }
    .logs-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .logs-header .actions { display: flex; gap: 15px; }
    .btn-outline { padding: 8px 20px; border: 1px solid #e2e8f0; background: white; border-radius: 8px; cursor: pointer; }
    .logs-header input { padding: 8px 15px; border-radius: 8px; border: 1px solid #e2e8f0; outline: none; width: 250px; }

    .log-list { display: flex; flex-direction: column; }
    .log-entry { display: flex; align-items: flex-start; gap: 25px; padding: 25px 0; border-bottom: 1px solid #f8fafc; }
    .log-entry:last-child { border: none; }
    
    .log-time { min-width: 80px; display: flex; flex-direction: column; text-align: right; }
    .log-time strong { color: #1e293b; }
    .log-time span { color: #94a3b8; font-size: 0.8rem; }
    
    .log-icon { width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .icon-report { background: #eff6ff; color: #3b82f6; }
    .icon-po { background: #f0fdf4; color: #10b981; }
    .icon-budget { background: #fffbeb; color: #f59e0b; }
    
    .log-content { flex: 1; }
    .log-action { margin: 0 0 8px 0; color: #334155; }
    .log-meta { display: flex; gap: 20px; font-size: 0.8rem; color: #94a3b8; }
  `]
})
export class AuditLogsComponent implements OnInit {
  logs: any[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.financeService.getAuditLogs().subscribe(data => this.logs = data.reverse());
  }

  getIcon(action: string): string {
    if (action.includes('REPORT')) return '📄';
    if (action.includes('PO')) return '📜';
    if (action.includes('BUDGET')) return '💰';
    return '🔔';
  }

  getIconClass(action: string): string {
    if (action.includes('REPORT')) return 'icon-report';
    if (action.includes('PO')) return 'icon-po';
    if (action.includes('BUDGET')) return 'icon-budget';
    return 'icon-default';
  }
}
