import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private api: ApiService) {}
  placeOrder(mealId: string) { return this.api.post('/orders', { mealId }); }             // beneficiary
  acceptOrder(orderId: string) { return this.api.post(`/orders/${orderId}/accept`, {}); } // member
  listMine(role: 'member'|'beneficiary') { return this.api.get(`/orders?role=${role}`); }
}