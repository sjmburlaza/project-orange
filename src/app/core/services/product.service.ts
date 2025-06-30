import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = '/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.API_URL}`);
  }
}
