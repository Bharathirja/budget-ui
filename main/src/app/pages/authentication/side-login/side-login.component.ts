import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { set } from 'date-fns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { M } from '@angular/cdk/keycodes';
import { MessageArchivedComponent } from 'src/app/components/message-archived-component/message-archived-component.component';

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

  
  private snackBar = inject(MatSnackBar);
  onSubmit() {
    if (this.form.valid && this.form.value.username && this.form.value.password) {
      const requestPayload: { username: string, password: string} = {
        username: this.form.value.username,
        password: this.form.value.password
      };
      this.authService.login(requestPayload).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          sessionStorage.setItem('authToken', response.access); // Example: store token in localStorage

          this.router.navigate(['/dashboard']);
          this.snackBar.openFromComponent(MessageArchivedComponent,
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: 'success-snackbar',
              data: 'Login Successful!!'
            }
          );
        },
        error: (error) => {
          this.snackBar.openFromComponent(MessageArchivedComponent,
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: 'success-snackbar',
              data: error.error?.detail ? error.error?.detail : 'An error occurred'
            }
          );
        }
      });
    }
  }
}
