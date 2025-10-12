import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from 'src/app/http/api.service';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpParams } from '@angular/common/http';
import { CommonTableComponent } from 'src/app/components/common-table/common-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  imports: [
    MatCardModule,
    CommonModule,
    MaterialModule,
    CommonTableComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  sortField: string = '';
  sortDirection: string = '';
  searchSubject = new Subject<string>();
  currentSearchQuery: string = '';
  apiService = inject(ApiService);
  router = inject(Router);
  columns: any[] = [
    'transaction_name', 'amount', 'quantity_or_kg', 'total_amount', 'created_at', 'action'
  ];
  displayedColumns: string[] = ['transaction_name', 'amount', 'quantity_or_kg', 'total_amount', 'created_at'];
  pageSize: number = 10;
  pageIndex: number = 0;
  data: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadData();
  }

  navigateToCreateTransaction() {
    this.router.navigate(['budget/create-transaction']);
  }

 
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

}
