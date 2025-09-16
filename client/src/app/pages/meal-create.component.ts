import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealsService } from '../core/meals.service';

@Component({
  selector: 'app-meal-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submit()">
    <h2>Create Meal (Member)</h2>
    <input [(ngModel)]="title" name="title" placeholder="Title" required>
    <input [(ngModel)]="description" name="description" placeholder="Description">
    <input [(ngModel)]="dietaryTags" name="dietaryTags" placeholder="Dietary tags (comma separated)">
    <input [(ngModel)]="portionsAvailable" name="portionsAvailable" type="number" min="0" placeholder="Portions">
    <button>Create</button>
  </form>
  <pre *ngIf="result">{{ result | json }}</pre>
  `
})
export class MealCreateComponent {
  // Form model (template-driven): strings bound by ngModel
  title=''; description=''; dietaryTags=''; portionsAvailable:any = 0; result:any;
  constructor(private meals: MealsService) {}
  // On submit, shape data to match API contract and call MealsService.create(...)
  submit(){
    const payload = {
      title:this.title,
      description:this.description,
       // Split comma-separated tags into an array and trim whitespace
      dietaryTags: this.dietaryTags ? this.dietaryTags.split(',').map(s=>s.trim()) : [],
      // Force number to avoid sending a string to the API
      portionsAvailable: Number(this.portionsAvailable || 0)
    };
    // Subscribe to the HTTP Observable; stash either the response or error to display
    this.meals.create(payload).subscribe({ next:r=>this.result=r, error:e=>this.result=e?.error||e });
  }
}