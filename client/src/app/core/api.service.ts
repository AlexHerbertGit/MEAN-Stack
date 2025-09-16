import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Base API origin for the backend.
 * For local dev: update if your server runs elsewhere/another port.
 * Tip: Consider moving this to Angular environments for easy switching.
 */

const API = 'http://localhost:4000/api'; // adjust if needed

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  /**
   * GET helper that automatically sends credentials (cookies) to the backend.
   * withCredentials supports cookie-based sessions/JWT on the server.
   */
  get<T>(url: string)    { return this.http.get<T>(API + url,    { withCredentials: true }); }
  /**
   * POST helper for create/auth actions.
   * Also sends credentials so server can set/read auth cookies.
   */
  post<T>(url: string, body: any) { return this.http.post<T>(API + url,  body, { withCredentials: true }); }
  /**
   * PATCH helper for partial updates.
   */
  patch<T>(url: string, body: any){ return this.http.patch<T>(API + url, body, { withCredentials: true }); }
  /**
   * DELETE helper for removals.
   */
  del<T>(url: string)    { return this.http.delete<T>(API + url, { withCredentials: true }); }
}