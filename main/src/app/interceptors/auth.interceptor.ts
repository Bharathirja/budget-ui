// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Retrieve the auth token from a service or storage
  const authToken = sessionStorage.getItem('authToken') || "";
  const router = inject(Router);

  // Clone the request and add the new header'
  if (req.url.includes('login') || req.url.includes('register')) {
    return next(req);
  } else {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq).pipe(catchError(err => {
      // Handle errors, e.g., redirect to login on 401 Unauthorized
      if (err.status === 401) {
        // Redirect to login or perform other actions
        router.navigate(['/authentication/login']);
        console.error('Unauthorized request - redirecting to login.');
      }
      throw err;
    }));
  }
  // Pass the cloned request to the next handler

};