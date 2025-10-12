import { CommonModule, DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
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
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { CommonTableComponent } from 'src/app/components/common-table/common-table.component';
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
    MatButtonModule, CommonTableComponent,],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  displayedColumns1: string[] = ['category_name', 'description', 'created_at', 'actions'];

  ngOnInit() {
  }

  sortField: string = '';
  sortDirection: string = '';
  searchSubject = new Subject<string>();
  currentSearchQuery: string = '';
  apiService = inject(ApiService);
  router = inject(Router);
  columns: any[] = [
    'category_name', 'description', 'created_at', 'action'
  ];
  displayedColumns: string[] = ['category_name', 'description', 'created_at', 'action'];
  pageSize: number = 10;
  pageIndex: number = 0;
  data: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;

  ngAfterViewInit() {
    this.loadData();
  }

  navigateToCreateTransaction() {
    this.router.navigate(['budget/create-category']);
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
    this.apiService.getCategories(params).subscribe((data: any) => {
      this.data = data.results;
      this.resultsLength = data.count;
      this.isLoadingResults = false;
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
