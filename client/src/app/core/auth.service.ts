import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';

/**
 * AuthService
 * ------------
 * Responsibility:
 * - Talks to the backend /api/auth endpoints for register + login.
 * - Stores the JWT so it can be attached by the HTTP interceptor on future requests.
 * - Exposes simple "isLoggedIn" and "currentUser" state for the UI (navbar, guards, etc.).
 */

export type Role = 'beneficiary' | 'member';
export interface Me {
  id: string;
  name: string;
  email: string;
  role: Role;
  tokenBalance?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Current user state as an observable stream.
   * Components can subscribe to react to login/logout immediately.
   * null means "not authenticated".
   */
  me$ = new BehaviorSubject<Me | null>(null);

  constructor(private api: ApiService) {
    /**
     * On app startup try to restore the session by asking the server who we are.
     * If the backend uses a cookie-based session/JWT, withCredentials in ApiService
     * ensures the cookie is sent and /auth/me can return the logged-in user.
     */
    this.refreshMe().subscribe({ error: () => {} });
  }

  /**
   * Register a new user.
   * POST /auth/register with the required fields.
   * On success, immediately refresh the "me" state so the UI updates.
   */
  register(payload: { name: string; email: string; password: string; role: Role; address?: string }) {
    return this.api.post('/auth/register', payload).pipe(
      tap(() => this.refreshMe().subscribe())
    );
  }

  /**
   * Log in an existing user.
   * POST /auth/login with email/password.
   * On success, refresh "me" so subscribers (e.g., navbars/guards) react.
   */
  login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password }).pipe(
      tap(() => this.refreshMe().subscribe())
    );
  }

  /**
   * Log out the current user.
   * POST /auth/logout to invalidate the server-side session/JWT.
   * Then set me$ to null locally so the app hides protected UI.
   */
  logout() {
    return this.api.post('/auth/logout', {}).pipe(
      tap(() => this.me$.next(null))
    );
  }

  /**
   * Ask the server who the current user is.
   * If authenticated, server returns Me; otherwise it will error (handled by caller).
   * The tap ensures me$ always reflects the latest identity.
   */
  refreshMe() {
    return this.api.get<Me>('/auth/me').pipe(tap(m => this.me$.next(m)));
  }
}