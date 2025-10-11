import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { set } from 'date-fns';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  constructor( private router: Router) {}

  authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    // this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.form.valid && this.form.value.username && this.form.value.password) {
      this.submit();
      const requestPayload: { username: string, password: string} = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      this.authService.login(requestPayload).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          sessionStorage.setItem('authToken', response.access); // Example: store token in localStorage
          // Handle successful login, e.g., navigate to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          // Handle login error, e.g., show error message
        }
      });
    }
  }
}
