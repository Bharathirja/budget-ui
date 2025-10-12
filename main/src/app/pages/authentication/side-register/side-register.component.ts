import { Component, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ApiService } from 'src/app/http/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  authService = inject(AuthService);

  constructor(private settings: CoreService, private router: Router) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    // this.router.navigate(['/']);
    const payload = {
      username: this.form.value.username!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      password2: this.form.value.password2!,
    };
    this.authService.registerNewUser(payload).subscribe({
      next: (res) => {
        console.log(res);
        alert('Registration Successful');
        this.form.reset();
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      },
    });
    //
  }

  onSubmit() {
    if (this.form.valid && this.form.value.username && this.form.value.email && this.form.value.password && this.form.value.password2) {
      if (this.form.value.password !== this.form.value.password) {
        this.form.setErrors({ passwordMismatch: true });
        // Handle password mismatch error
        alert('Passwords do not match');
        return;
      }
      this.submit();
      // Handle successful registration, e.g., navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
