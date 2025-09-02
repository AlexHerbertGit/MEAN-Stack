import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../core/orders.service';

@Component({
  selector: 'app-order-accept',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submit()">
    <h2>Accept Order (Member)</h2>
    <input [(ngModel)]="orderId" name="orderId" placeholder="Order ID" required>
    <button>Accept</button>
  </form>
  <pre *ngIf="result">{{ result | json }}</pre>
  `
})
export class OrderAcceptComponent {
  orderId=''; result:any;
  constructor(private orders: OrdersService) {}
  submit(){ this.orders.acceptOrder(this.orderId).subscribe({ next:r=>this.result=r, error:e=>this.result=e?.error||e }); }
}