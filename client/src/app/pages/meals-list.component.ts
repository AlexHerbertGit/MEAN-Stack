import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsService, Meal } from '../core/meals.service';

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
      <div>Portions: {{ m.portionsAvailable }}</div>
      <div>Dietary: {{ m.dietaryTags?.join(', ') }}</div>
      <small>ID: {{ m._id }}</small>
    </div>
  </div>
  `
})
export class MealsListComponent implements OnInit {
  meals: Meal[] = []; error:any;
  constructor(private mealsSvc: MealsService) {}
  ngOnInit(){ this.mealsSvc.list().subscribe({ next: m => this.meals = m, error: e => this.error = e }); }
}