import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface Meal {
  _id?: string;
  title: string;
  description?: string;
  dietaryTags?: string[];
  portionsAvailable?: number;
  deliveryDays?: string[];
  provider?: string;
}

@Injectable({ providedIn: 'root' })
export class MealsService {
  constructor(private api: ApiService) {}
  list() { return this.api.get<Meal[]>('/meals'); }
  create(meal: Meal) { return this.api.post<Meal>('/meals', meal); } // member-only on API
}