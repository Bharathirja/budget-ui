import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from 'src/app/http/api.service';
import { MaterialModule } from 'src/app/material.module';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

export interface ICategory {
  category_name: string;
  description: string;
}


@Component({
  selector: 'app-category',
  imports: [MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule, MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule, DatePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  // table 1
  displayedColumns1: string[] = ['category_name', 'description', 'created_at', 'actions'];
  dataSource1 = [];
  categoryService = inject(ApiService);

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      console.log(data);
      this.dataSource1 = data.results;
    });
  }

  categoryForm: FormGroup = new FormGroup({
    category_name: new FormControl(null, Validators.required),
    description: new FormControl(),
  });

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryService.addCategory(this.categoryForm.value as ICategory).subscribe((response) => {
        console.log('Category added successfully', response);
        this.categoryForm.reset();
        this.getAllCategories();
      }, (error) => {
        console.error('Error adding category', error);
      });
    }
  }



  onCancel() {
    this.categoryForm.reset();
  }
}
