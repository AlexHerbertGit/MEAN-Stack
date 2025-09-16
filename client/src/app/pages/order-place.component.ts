import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../core/orders.service';

// Minimal form to place an order given a Meal ID.

@Component({
  selector: 'app-order-place',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submit()">
    <h2>Place Order (Beneficiary)</h2>
    <input [(ngModel)]="mealId" name="mealId" placeholder="Meal ID" required>
    <button>Order</button>
  </form>
  <pre *ngIf="result">{{ result | json }}</pre>
  `
})
export class OrderPlaceComponent {
  mealId=''; // Two-way bound meal id input
  result:any; // Displays API response or error
  constructor(private orders: OrdersService) {}

   // POST to /orders with the selected meal id
  submit(){ this.orders.placeOrder(this.mealId).subscribe({ next:r=>this.result=r, error:e=>this.result=e?.error||e }); }
}