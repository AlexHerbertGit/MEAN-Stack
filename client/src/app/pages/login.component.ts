import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submit()">
    <h2>Login</h2>
    <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
    <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
    <button>Login</button>
  </form>
  <pre *ngIf="result">{{ result | json }}</pre>
  `
})
export class LoginComponent {
  email = ''; password = ''; result: any;
  constructor(private auth: AuthService) {}
  submit() {
    this.auth.login(this.email, this.password).subscribe({
      next: r => this.result = r,
      error: e => this.result = e?.error || e
    });
  }
}