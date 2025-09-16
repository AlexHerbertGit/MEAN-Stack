import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

// Provides a typed API wrapper for "meals" endpoints used by the UI.

// Strongly-typed shape of a Meal document coming from the API.
export interface Meal {
  _id?: string;            // Mongo-style id assigned by backend
  title: string;           // Name of the meal (required by backend)
  description?: string;    // Optional text about the meal
  dietaryTags?: string[];  // e.g., ["vegan", "gluten-free"]
  portionsAvailable?: number; // Inventory/portion count
  deliveryDays?: string[];    // Days of week this meal can be delivered
  provider?: string;          // Member/organisation providing the meal
}

@Injectable({ providedIn: 'root' })
export class MealsService {
  constructor(private api: ApiService) {}
  
  // GET /meals -> fetch list of all available meals for display
  list() { return this.api.get<Meal[]>('/meals'); }

  // POST /meals -> create a new meal (only accessible to members server-side)
  create(meal: Meal) { return this.api.post<Meal>('/meals', meal); } // member-only on API
}