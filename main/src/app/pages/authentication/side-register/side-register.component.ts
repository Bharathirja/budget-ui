import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.form.valid && this.form.value.username && this.form.value.email && this.form.value.password && this.form.value.confirmPassword) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        // Handle password mismatch error
        console.error('Passwords do not match');
        return;
      }
      this.submit();
      // Handle successful registration, e.g., navigate to dashboard
      this.router.navigate(['/dashboard']);
    }
  }
}
