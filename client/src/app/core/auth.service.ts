import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

export interface Me {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

// ⬅️ Export a Role type so components can import it.
export type Role = 'beneficiary' | 'member' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private meSubject = new BehaviorSubject<Me | null>(null);
  public me$ = this.meSubject.asObservable();

  /** Query current user via cookie-based auth */
  refreshMe(): Observable<Me | null> {
    return this.http.get<Me>('http://localhost:4000/api/auth/me', { withCredentials: true }).pipe(
      tap((m) => this.meSubject.next(m)),
      catchError(() => { this.meSubject.next(null); return of(null); })
    );
  }

  /** Server-side logout (clears HttpOnly JWT cookie) */
  logout(): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>(
      'http://localhost:4000/api/auth/logout',
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => this.meSubject.next(null)),
      catchError(() => { this.meSubject.next(null); return of({ ok: false } as any); })
    );
  }

  // ⬇️ NEW: login helper expected by login.component.ts
  login(email: string, password: string): Observable<Me | null> {
    return this.http.post<{ ok: boolean }>(
      'http://localhost:4000/api/auth/login',
      { email, password },
      { withCredentials: true }
    ).pipe(
      // on success, re-fetch /me so UI gets the profile
      switchMap(() => this.refreshMe())
    );
  }

  // ⬇️ NEW: register helper expected by register.component.ts
  register(payload: { name: string; email: string; password: string; role: Role }): Observable<Me | null> {
    return this.http.post<{ ok: boolean }>(
      'http://localhost:4000/api/auth/register',
      payload,
      { withCredentials: true }
    ).pipe(
      // many APIs auto-login after register; if yours doesn’t, you can remove this
      switchMap(() => this.refreshMe())
    );
  }

  /** Optional: dev helper to clear stale cookie once per page load */
  forceLogoutOnBoot(): void {
    if (!this.isBrowser) return;
    const FLAG = 'dev:logout-cleared-on-boot';
    if (sessionStorage.getItem(FLAG)) return;
    sessionStorage.setItem(FLAG, '1');
    this.http.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true })
      .pipe(catchError(() => of(null)))
      .subscribe(() => this.meSubject.next(null));
  }
}