import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../core/orders.service';

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
  mealId=''; result:any;
  constructor(private orders: OrdersService) {}
  submit(){ this.orders.placeOrder(this.mealId).subscribe({ next:r=>this.result=r, error:e=>this.result=e?.error||e }); }
}