import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);

  baseUrl = environment.baseUrl; // Replace with your API base URL

  getCategories(params?: HttpParams) {
    return this.http.get(`${this.baseUrl}categories/`, { params });
  }

  addCategory(data: { category_name: string; description: string }) {
    return this.http.post(`${this.baseUrl}categories/`, data);
  }

  getTransactions(params?: HttpParams) {
    return this.http.get(`${this.baseUrl}transactions/`, { params });
  }

  addTransaction(data: { transaction_name: string; description: string; category: number; amount: number; quantity_or_kg: string }) {
    return this.http.post(`${this.baseUrl}transactions/`, data);
  }
  
}
