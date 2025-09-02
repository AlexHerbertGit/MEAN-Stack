import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // so <router-outlet> & routerLink work
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {} 