import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:4000/api'; // adjust if needed

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  get<T>(url: string)    { return this.http.get<T>(API + url,    { withCredentials: true }); }
  post<T>(url: string, body: any) { return this.http.post<T>(API + url,  body, { withCredentials: true }); }
  patch<T>(url: string, body: any){ return this.http.patch<T>(API + url, body, { withCredentials: true }); }
  del<T>(url: string)    { return this.http.delete<T>(API + url, { withCredentials: true }); }
}