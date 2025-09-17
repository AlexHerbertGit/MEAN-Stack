import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Me } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h3>Login</h3>
      <label>Email</label>
      <input [(ngModel)]="email" type="email" />
      <label>Password</label>
      <input [(ngModel)]="password" type="password" />
      <button (click)="onLogin()">Login</button>

      <pre *ngIf="result">{{ result | json }}</pre>
    </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);

  email = '';
  password = '';
  result: unknown;

  onLogin(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: (r: Me | null) => this.result = r,
      error: (e: any) => this.result = e?.error || e
    });
  }
}