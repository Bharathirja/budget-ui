import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/http/api.service';
import { MaterialModule } from 'src/app/material.module';
import { Category } from '../models/model';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-transaction',
  imports: [MaterialModule],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditTransactionComponent {
  apiService = inject(ApiService);
  selectedCategory: string = '';
  category: Category[] = [];
  router = inject(Router);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: any }) {
    this.apiService.getTransactionByID(data.id).subscribe({
      next: (res: any) => {
        console.log('Category ID', res);
        this.transactionForm.patchValue(res);
      }
    })
  }

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
      let date: any;
      if(this.transactionForm.get('date')?.dirty) {
        date = this.transactionForm.value.date?.toISOString().split('T')[0]
      }else {
        date = this.transactionForm.value.date
      }
      
      const formData: any = {
        transaction_name: this.transactionForm.value.transaction_name,
        category: this.selectedCategory,
        amount: this.transactionForm.value.amount,
        quantity_or_kg: this.transactionForm.value.quantity_or_kg,
        date, // Format date as YYYY-MM-DD
      };
      this.apiService.updateTransaction(this.data.id, formData).subscribe({
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
    this.transactionForm.updateValueAndValidity();
    this.dialog.closeAll();

  };

  readonly dialog = inject(MatDialog);

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
