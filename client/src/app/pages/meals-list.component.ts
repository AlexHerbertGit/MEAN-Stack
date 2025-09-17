import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsService, Meal } from '../core/meals.service';

// Displays all meals from the API with a simple card layout.

@Component({
  selector: 'app-meals-list',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <h2>Meals</h2>
    <div *ngIf="error"><pre>{{ error | json }}</pre></div>
    <div *ngFor="let m of meals" class="card">
      <strong>{{ m.title }}</strong>
      <div>{{ m.description }}</div>
      <div>Portions: {{ m.qtyAvailable }}</div>
      <div>Dietary: {{ m.dietary?.join(', ') }}</div>
      <small>ID: {{ m._id }}</small>
    </div>
  </div>
  `
})
export class MealsListComponent implements OnInit {
  meals: Meal[] = []; // List state for the template
  error:any; // Holds any HTTP error to show in the UI
  constructor(private mealsSvc: MealsService) {}

  // On first render, request the meals and populate state
  ngOnInit(){ this.mealsSvc.list().subscribe({ next: m => this.meals = m, error: e => this.error = e }); }
}