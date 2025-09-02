import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';

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
  me$ = new BehaviorSubject<Me | null>(null);

  constructor(private api: ApiService) {
    // Try load current session on app start
    this.refreshMe().subscribe({ error: () => {} });
  }

  register(payload: { name: string; email: string; password: string; role: Role; address?: string }) {
    return this.api.post('/auth/register', payload).pipe(
      tap(() => this.refreshMe().subscribe())
    );
  }

  login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password }).pipe(
      tap(() => this.refreshMe().subscribe())
    );
  }

  logout() {
    return this.api.post('/auth/logout', {}).pipe(
      tap(() => this.me$.next(null))
    );
  }

  refreshMe() {
    return this.api.get<Me>('/auth/me').pipe(tap(m => this.me$.next(m)));
  }
}