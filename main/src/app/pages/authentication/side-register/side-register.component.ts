import { Component, inject } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageArchivedComponent } from 'src/app/components/message-archived-component/message-archived-component.component';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  authService = inject(AuthService);

  constructor(private settings: CoreService, private router: Router) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  private _snackBar = inject(MatSnackBar);


  submit() {
    const payload = {
      username: this.form.value.username!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      password2: this.form.value.password2!,
    };
    this.authService.registerNewUser(payload).subscribe({
      next: (res) => {
        console.log(res);
        this._snackBar.openFromComponent(MessageArchivedComponent,
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'error-snackbar',
            data: 'Registration Successful!!'
          }
        );
        this.router.navigate(['/authentication/login']);
        this.form.reset();
      },
      error: (err) => {
        console.error('Registration failed', err);
        let errorMsg = '';
        if(err.error.password){
          errorMsg = err.error.password[0];
        }
        else if(err.error.password2){
          errorMsg = err.error.password2[0];
        }
        else if(err.error.email){
          errorMsg = err.error.email[0];
        }
        else if(err.error.username){
          errorMsg = err.error.username[0];
        }
        else{
          errorMsg = 'An error occurred';
        }
        this._snackBar.openFromComponent(MessageArchivedComponent,
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'error-snackbar',
            data: errorMsg
          }
        );
      },
    });
  }

  onSubmit() {
    if (this.form.valid && this.form.value.username && this.form.value.email && this.form.value.password && this.form.value.password2) {
      if (this.form.value.password !== this.form.value.password) {
        this.form.setErrors({ passwordMismatch: true });
        // Handle password mismatch error
        this._snackBar.open('Passwords do not match');
        return;
      }
      this.submit();
      // Handle successful registration, e.g., navigate to dashboard
      // this.router.navigate(['/dashboard']);
    }
  }
}
