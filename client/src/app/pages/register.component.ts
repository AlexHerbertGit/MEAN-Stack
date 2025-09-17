import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Role, Me } from '../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h3>Register</h3>
      <label>Name</label>
      <input [(ngModel)]="name" />
      <label>Email</label>
      <input [(ngModel)]="email" type="email" />
      <label>Password</label>
      <input [(ngModel)]="password" type="password" />
      <label>Role</label>
      <select [(ngModel)]="role">
        <option value="beneficiary">Beneficiary</option>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button (click)="onRegister()">Create Account</button>

      <pre *ngIf="result">{{ result | json }}</pre>
    </div>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);

  name = '';
  email = '';
  password = '';
  role: Role = 'beneficiary';
  result: unknown;

  onRegister(): void {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    }).subscribe({
      next: (r: Me | null) => this.result = r,
      error: (e: any) => this.result = e?.error || e
    });
  }
}