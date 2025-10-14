import { HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { CommonTableComponent } from 'src/app/components/common-table/common-table.component';
import { ApiService } from 'src/app/http/api.service';
import { MaterialModule } from 'src/app/material.module';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog-component.component';
import { CreateCategoryComponent } from '../create-category/create-category.component';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

export interface PeriodicElement {
  risk_plan: string;
  questionnairre: string;
  modified: any;
}

export interface ICategory {
  category_name: string;
  description: string;
}


@Component({
  selector: 'app-category',
  imports: [
    MaterialModule, 
    // CommonTableComponent,
    MatFormFieldModule
  ],
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
  searchValue: string = '';

  ngAfterViewInit() {
    this.loadData();
  }

  onSearch(event: any) {
    const value = (event.target as HTMLInputElement).value;
     this.currentSearchQuery = value;
    this.pageIndex = 0;
    this.loadData(this.currentSearchQuery);
  }

  navigateToCreateCategory() {
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

  readonly dialog = inject(MatDialog);

  openDialog(data: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: {
        id: data.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }

  openAddCategoryModal() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }

  openConfirmDialog(transaction: any): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed with this action?'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.apiService.deleteCategory(transaction.id).subscribe({
          next: (res) => {
            this.loadData();
          }
        })
        console.log('User confirmed the action.');
        // Perform the action
      } else {
        console.log('User dismissed the action.');
        // Do nothing or handle dismissal
      }
    });
  }
}
