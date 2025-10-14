import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/http/api.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-edit-category',
  imports: [
    MaterialModule
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  apiService = inject(ApiService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: any }) {
    this.apiService.getCategoryByID(data.id).subscribe({
      next: (res: any) => {
        console.log('Category ID', res);
        this.categoryForm.patchValue(res);
      }
    })
  }

  categoryForm: FormGroup = new FormGroup({
    category_name: new FormControl(null, Validators.required),
    description: new FormControl(),
  });
  categoryService = inject(ApiService);
  router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  
  onCancel() {

  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryService.updateCategory(this.data.id, this.categoryForm.value).subscribe((response) => {
        console.log('Category added successfully', response);
        this.categoryForm.reset();
        this._snackBar.open('Updated Successfully!!');
        this.dialog.closeAll();
      }, (error) => {
        console.error('Error adding category', error);
        this.dialog.closeAll();
      });
    }

  }

}
