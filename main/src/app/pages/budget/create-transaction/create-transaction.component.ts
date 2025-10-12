import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { ApiService } from 'src/app/http/api.service';
import { MaterialModule } from 'src/app/material.module';
import { Category } from '../models/model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-transaction',
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
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateTransactionComponent implements OnInit{

  apiService = inject(ApiService);
  selectedCategory: string = '';
  category: Category[] = [];
  router = inject(Router);

  transactionForm = new FormGroup({
    transaction_name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantity_or_kg: new FormControl('', [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date(), Validators.required),
  });

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formData: any = {
        transaction_name: this.transactionForm.value.transaction_name,
        category: this.selectedCategory,
        amount: this.transactionForm.value.amount,
        quantity_or_kg: this.transactionForm.value.quantity_or_kg,
        date: this.transactionForm.value.date?.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      };
      this.apiService.addTransaction(formData).subscribe({
        next: (res) => {
          console.log('Transaction added successfully', res);
          this.onCancel();
          this.router.navigate(['budget/transactions']);
        },
        error: (err) => {
          console.error('Error adding transaction', err);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

   onCancel() {
    this.transactionForm.controls['date'].setValue(new Date());
    this.transactionForm.reset();
    this.transactionForm.markAsPristine();
    this.transactionForm.markAsUntouched();
    this.transactionForm.updateValueAndValidity
  };

   navigateToCategory() {
    this.router.navigate(['budget/category']);
    console.log('Navigating to category management page...');
  }

   getCategories() {
    this.apiService.getCategories().pipe(map((res: any) => {
      return res.results.map((item: any) => ({ value: item.id, viewValue: item.category_name }))
    })).subscribe((data: any) => {
      this.category = data;
      this.selectedCategory = this.category[0].value;
    });
  }

}
