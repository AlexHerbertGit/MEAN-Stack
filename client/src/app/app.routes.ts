import { Routes } from '@angular/router';
import { MealsListComponent } from './pages/meals-list.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { DashboardComponent } from './pages/dashboard.component';
import { MealCreateComponent } from './pages/meal-create.component';
import { OrderPlaceComponent } from './pages/order-place.component';
import { OrderAcceptComponent } from './pages/order-accept.component';

export const routes: Routes = [
  { path: '', component: MealsListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'meal-create', component: MealCreateComponent },
  { path: 'order', component: OrderPlaceComponent },
  { path: 'order-accept', component: OrderAcceptComponent },
];