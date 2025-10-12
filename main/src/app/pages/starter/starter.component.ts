import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppYearlyBreakupComponent } from 'src/app/components/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from 'src/app/components/monthly-earnings/monthly-earnings.component';
import { AppRecentTransactionsComponent } from 'src/app/components/recent-transactions/recent-transactions.component';

import { ApiService } from 'src/app/http/api.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppRecentTransactionsComponent,
   
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit{ 
  apiService = inject(ApiService);
  totalCategories: number = 0;
  totalTransactions: number = 0;
  router = inject(Router);


  ngOnInit(): void {
    this.fetchTotalCategories();
    this.fetchTotalTransactions();
  }

  fetchTotalCategories() {
    this.apiService.getCategories().pipe(
      // Using map to transform the response if needed
      // Here we just return the length of the categories array
      map((response: any) => response.count)
    ).subscribe({
      next: (count) => {
        this.totalCategories = count;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  fetchTotalTransactions() {
    this.apiService.getTransactions().pipe(
      map((response: any) => {
        const results = response.results.map((item: any) => {
          const total_amount = item.amount * item.quantity_or_kg;
          return { ...item, total_amount };

        });
        return { ...response, results };
      })
    ).subscribe({
      next: (res: any) => {
        this.totalTransactions = res.results.map(((item: any) => item.total_amount )).reduce((acc: number, val: number) => acc + val, 0);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  navigateToCateory() {
    this.router.navigate(['budget/category']);
  }

  navigateToTransaction() {
    this.router.navigate(['budget/transactions']);
  }
}