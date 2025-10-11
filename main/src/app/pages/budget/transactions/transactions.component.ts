import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ApiService } from 'src/app/http/api.service';
import { map, merge, tap } from 'rxjs';
import { Subject } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonTableComponent } from 'src/app/components/common-table/common-table.component';
import { Router } from '@angular/router';
interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transactions',
  providers: [provideNativeDateAdapter()],
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
    MatButtonModule, DatePipe,
    MatDatepickerModule,
    CommonTableComponent,
],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  sortField: string = '';
  sortDirection: string = '';
  private searchSubject = new Subject<string>();
  currentSearchQuery: string = '';

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

  navigateToCategory() {
    // Logic to navigate to the category management page
    // For example, using Angular Router:
    this.router.navigate(['budget/category']);
    console.log('Navigating to category management page...');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.loadData();
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
          this.loadData();
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

  // Table with pagination and sorting

  columns: any[] = [
    // {
    //   key: 'transaction_name', label: 'Transaction Name'
    // },
    // {
    //   key: 'amount', label: 'Amount',
    // },
    // {
    //   key: 'quantity_or_kg', label: 'Quantity/Kg',
    // },
    // {
    //   key: 'total_amount', label: 'Total Amount',
    // },
    // {
    //   key: 'created_at', label: 'Date', format: 'date'
    // }
    'transaction_name', 'amount', 'quantity_or_kg', 'total_amount', 'created_at', 'action'
  ];
  displayedColumns: string[] = ['transaction_name', 'amount', 'quantity_or_kg', 'total_amount', 'created_at'];

  pageSize: number = 10;
  pageIndex: number = 0;
  data: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  apiEndpoint = 'https://budget-api-m3bh.onrender.com/api/v1/budget/transactions/'; // Replace with your DRF URL
  http = inject(HttpClient)


  loadData(searchQuery?: string): void {
    this.isLoadingResults = true;
    let params = new HttpParams();
    // Always use local pageIndex/pageSize for backend
    const page = this.pageIndex + 1;
    params = params.set('page', page.toString());
    params = params.set('page_size', this.pageSize.toString());

    // Use local sortField/sortDirection for backend ordering
    if (this.sortField && this.sortDirection) {
      const ordering = `${this.sortDirection === 'desc' ? '-' : ''}${this.sortField}`;
      params = params.set('ordering', ordering);
    }

    if (searchQuery) {
      params = params.set('search', searchQuery);
    }
    this.apiService.getTransactions(params).pipe(
      map((response: any) => {
        this.isLoadingResults = false;
        this.resultsLength = response.count;
        const results = response.results.map((row: any) => ({
          ...row,
          total_amount: row.amount * row.quantity_or_kg
        }));
        return results;
      })
    ).subscribe((data: any) => {
      this.data = data;
    });
  }

  onTableSearch(searchValue: string) {
    this.currentSearchQuery = searchValue;
    this.pageIndex = 0;
    this.loadData(this.currentSearchQuery);
  }

  onTablePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.currentSearchQuery);
  }

  onTableSort(event: any) {
    this.sortField = event.active;
    this.sortDirection = event.direction;
    this.loadData(this.currentSearchQuery);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(filterValue);
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
