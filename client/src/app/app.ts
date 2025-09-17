import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';   // <-- gives you *ngIf / ng-template
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterOutlet, RouterLink],
})
export class AppComponent implements OnInit {
  public auth = inject(AuthService);

  ngOnInit(): void {
    // Clear any stale JWT cookie on first page load (dev helper)
    this.auth.forceLogoutOnBoot();

    // Optionally fetch profile after that (will be null right after logout)
    // this.auth.refreshMe().subscribe();
  }
}