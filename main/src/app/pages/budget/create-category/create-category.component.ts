import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ICategory } from '../category/category.component';
import { ApiService } from 'src/app/http/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageArchivedComponent } from 'src/app/components/message-archived-component/message-archived-component.component';

@Component({
  selector: 'app-create-category',
  imports: [
    MaterialModule
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  categoryForm: FormGroup = new FormGroup({
    category_name: new FormControl(null, Validators.required),
    description: new FormControl(),
  });
  categoryService = inject(ApiService);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryService.addCategory(this.categoryForm.value as ICategory).subscribe((response) => {
        console.log('Category added successfully', response);
        this.categoryForm.reset();
        this._snackBar.openFromComponent(MessageArchivedComponent, {
          data: 'Category added successfully!!'
        });
        this.router.navigate(['budget/category']);
      }, (error) => {
        console.error('Error adding category', error);
        this._snackBar.openFromComponent(MessageArchivedComponent,
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'error-snackbar',
            data: error.error?.category_name ? error.error?.category_name[0] : 'An error occurred'
          }
        )
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Optional: duration in milliseconds
    });
  }

  onCancel() {
    this.categoryForm.reset();
  }

}
