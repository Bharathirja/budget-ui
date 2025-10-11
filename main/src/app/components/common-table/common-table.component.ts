import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@Component({
    standalone: true,
    imports: [MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatInputModule,
        MatCheckboxModule,
        MatTableModule,
        CommonModule,
        MatCardModule,
        MaterialModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule, DatePipe, TitleCasePipe,
        MatDatepickerModule,
   ],
    selector: 'app-common-table',
    templateUrl: './common-table.component.html',
    styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
    @Input() columns: any[] = [];
    @Input() displayedColumns: string[] = [];
    @Input() headersColumns: string[] = [];
    
    @Input() data: any[] = [];
    @Input() pageSize: number = 10;
    @Input() resultsLength: number = 0;
    @Input() isLoadingResults: boolean = false;
    @Input() showSearch: boolean = true;
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    @Output() pageChange: EventEmitter<{ pageIndex: number, pageSize: number }> = new EventEmitter();
    @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() showActions: boolean = false;
    dataSource = new MatTableDataSource<any>();
    searchSubject = new Subject<string>();
    searchValue: string = '';

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit() {
        this.updateDataSource();
        this.searchSubject.pipe(debounceTime(300)).subscribe((value) => {
            this.search.emit(value);
        });
    }

    ngOnChanges() {
        this.updateDataSource();
    }

    updateDataSource() {
        this.dataSource = new MatTableDataSource(this.data);
        // Do NOT assign paginator/sort for backend-driven table
    }

    onSearch(event: Event) {
       
                const value = (event.target as HTMLInputElement).value;
                this.searchValue = value;
                this.searchSubject.next(value);
    }

    onPageChange(event: any) {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
    }

    onSortChange(event: any) {
        this.sortChange.emit(event);
    }
}
