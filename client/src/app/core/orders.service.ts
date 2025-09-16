import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

// Wraps order-related API calls used by beneficiaries and members.

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private api: ApiService) {}
  // POST /orders -> beneficiary creates an order for a given mealId
  placeOrder(mealId: string) { return this.api.post('/orders', { mealId }); }             // beneficiary

  // POST /orders/:id/accept -> member marks an order as accepted.
  acceptOrder(orderId: string) { return this.api.post(`/orders/${orderId}/accept`, {}); } // member
  
  // GET /orders?role=... -> list orders relevant to the current user role
  listMine(role: 'member'|'beneficiary') { return this.api.get(`/orders?role=${role}`); }
}