import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatDividerModule],
  template: `
    <div class="notifications-container">
      <header class="page-header">
        <h1>Notifications</h1>
        <button mat-stroked-button (click)="loadNotifications()">
          <mat-icon>refresh</mat-icon> Refresh
        </button>
      </header>

      <mat-list class="notification-list">
        <ng-container *ngFor="let note of notifications; let last = last">
          <mat-list-item [class.unread]="!note.isRead">
            <mat-icon matListItemIcon [color]="note.type === 'LOW_STOCK' ? 'warn' : 'primary'">
              {{note.type === 'LOW_STOCK' ? 'report_problem' : 'info'}}
            </mat-icon>
            <div matListItemTitle class="note-title">{{note.title}}</div>
            <div matListItemLine class="note-message">{{note.message}}</div>
            <div matListItemLine class="note-date">{{note.createdAt | date:'medium'}}</div>
            
            <div matListItemMeta>
              <button mat-icon-button *ngIf="!note.isRead" (click)="markAsRead(note.id)">
                <mat-icon>check_circle</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteNote(note.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-list-item>
          <mat-divider *ngIf="!last"></mat-divider>
        </ng-container>
      </mat-list>
    </div>
  `,
  styles: [`
    .notifications-container { padding: 30px; max-width: 900px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .notification-list { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .unread { background: #f7fafc; border-left: 4px solid #3182ce; }
    .note-title { font-weight: 600; color: #2d3748; }
    .note-message { color: #4a5568; }
    .note-date { font-size: 0.8rem; color: #a0aec0; }
  `]
})
export class NotificationsComponent implements OnInit {
  private http = inject(HttpClient);
  notifications: any[] = [];

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.http.get<any[]>('/api/notifications').subscribe(data => this.notifications = data);
  }

  markAsRead(id: number) {
    this.http.put(`/api/notifications/read/${id}`, {}).subscribe(() => this.loadNotifications());
  }

  deleteNote(id: number) {
    this.http.delete(`/api/notifications/${id}`).subscribe(() => this.loadNotifications());
  }
}

