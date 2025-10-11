import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  baseUrl = 'https://budget-api-m3bh.onrender.com/api/v1/budget/'; // Replace with your API base URL

  getCategories() {
    return this.http.get(`${this.baseUrl}categories/`);
  }

  addCategory(data: { category_name: string; description: string }) {
    return this.http.post(`${this.baseUrl}categories/`, data);
  }

  getTransactions(params: HttpParams) {
    return this.http.get(`${this.baseUrl}transactions/`, { params });
  }

  addTransaction(data: { transaction_name: string; description: string; category: number; amount: number; quantity_or_kg: string }) {
    return this.http.post(`${this.baseUrl}transactions/`, data);
  }
  
}
