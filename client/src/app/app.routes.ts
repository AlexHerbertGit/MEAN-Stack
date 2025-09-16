import { Routes } from '@angular/router';
import { MealsListComponent } from './pages/meals-list.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { DashboardComponent } from './pages/dashboard.component';
import { MealCreateComponent } from './pages/meal-create.component';
import { OrderPlaceComponent } from './pages/order-place.component';
import { OrderAcceptComponent } from './pages/order-accept.component';

// Application Routes Tables
export const routes: Routes = [
  // Public landing page shows meals available (read-only)
  { path: '', component: MealsListComponent },
  // Public authentication pages
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Auth-required areas (add canActivate if you have a guard)
  { path: 'dashboard', component: DashboardComponent },
  { path: 'meal-create', component: MealCreateComponent },
  // Ordering/accepting tokens — these support Req 2 later, but routes are here.
  { path: 'order', component: OrderPlaceComponent },
  { path: 'order-accept', component: OrderAcceptComponent },
];