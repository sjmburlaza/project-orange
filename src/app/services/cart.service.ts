import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = '/api/cart';

  constructor(private http: HttpClient) {}

  // getCart(): Observable<any> {
  //   return this.http.get<any>('assets/mock-data/cart.json');
  // }

  getCart(): Observable<any> {
    return this.http.get(this.API_URL );
  }
}
