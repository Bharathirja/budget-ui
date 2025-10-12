import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { ICategory } from '../category/category.component';
import { ApiService } from 'src/app/http/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
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


  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryService.addCategory(this.categoryForm.value as ICategory).subscribe((response) => {
        console.log('Category added successfully', response);
        this.categoryForm.reset();
        this.router.navigate(['budget/category']);
      }, (error) => {
        console.error('Error adding category', error);
      });
    }
  }



  onCancel() {
    this.categoryForm.reset();
  }

}
