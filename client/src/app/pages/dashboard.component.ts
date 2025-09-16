import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, Me } from '../core/auth.service';

// Minimal dashboard that displays the authenticated user object.
// Useed for verifying role-based behaviour.

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
  me: Me | null = null; // Holds the latest "me" snapshot from AuthService
  constructor(private auth: AuthService) { 
    // Subscribe to auth state stream; any changes update the view automatically
    this.auth.me$.subscribe(m => this.me = m); }
}