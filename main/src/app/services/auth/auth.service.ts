import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  apiUrl = environment.baseUrl // Replace with your authentication API URL

  login(credentials: { username: string; password: string }): Observable<any> {
    console.log('Logging in with', credentials);
    return this.http.post(`${this.apiUrl}token/`, credentials);
  }

  registerNewUser(data: { username: string; email: string; password: string; password2: string }): Observable<any> {
    console.log('Registering user with', data);
    return this.http.post(`${this.apiUrl}register/`, data);
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('authToken'); // Example: remove token from localStorage
  }

  isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem('authToken');
    return of(!!token); // Returns true if token exists, false otherwise
  }
  
}
