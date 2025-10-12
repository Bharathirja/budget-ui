import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { LoaderService } from '../interceptors/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinner, AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
loading$: Observable<boolean>;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$; // Subscribe to loading state
  }
}
