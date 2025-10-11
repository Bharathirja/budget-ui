import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  apiUrl = 'http://localhost:8000/api/token/'; // Replace with your authentication API URL

  login(credentials: { username: string; password: string }): Observable<any> {
    // Implement your login logic here, e.g., call an API to authenticate
    console.log('Logging in with', credentials);
    // For demonstration, we'll just return an observable of a success message
    return this.http.post(this.apiUrl, credentials);
  }

  logout(): void {
    // Implement your logout logic here, e.g., clear tokens, redirect to login page
    console.log('Logging out');
    localStorage.removeItem('authToken'); // Example: remove token from localStorage
  }

  isAuthenticated(): Observable<boolean> {
    // Implement your authentication logic here
    // For example, check for a token in localStorage or call an API
    const token = sessionStorage.getItem('authToken');
    return of(!!token); // Returns true if token exists, false otherwise
  }
  
}
