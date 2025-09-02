import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Role } from '../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submit()">
    <h2>Register</h2>
    <input [(ngModel)]="name" name="name" placeholder="Name" required>
    <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
    <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
    <select [(ngModel)]="role" name="role">
      <option value="beneficiary">Beneficiary</option>
      <option value="member">Member</option>
    </select>
    <input [(ngModel)]="address" name="address" placeholder="Address (optional)">
    <button>Create Account</button>
  </form>
  <pre *ngIf="result">{{ result | json }}</pre>
  `
})
export class RegisterComponent {
  name=''; email=''; password=''; role: Role = 'beneficiary'; address=''; result:any;
  constructor(private auth: AuthService) {}
  submit() {
    this.auth.register({ name:this.name, email:this.email, password:this.password, role:this.role, address:this.address })
      .subscribe({ next:r=>this.result=r, error:e=>this.result=e?.error||e });
  }
}