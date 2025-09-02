import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Me } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Dashboard</h2>
    <pre *ngIf="me as m">{{ m | json }}</pre>
    <div *ngIf="!me">Not logged in</div>
  </div>
  `
})
export class DashboardComponent {
  me: Me | null = null;
  constructor(private auth: AuthService) { this.auth.me$.subscribe(m => this.me = m); }
}