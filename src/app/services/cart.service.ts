import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = '/api';

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return forkJoin({
      entries: this.http.get(`${this.API_URL}/entries`),
      servicesAvailable: this.http.get(`${this.API_URL}/servicesAvailable`),
      servicesSelected: this.http.get(`${this.API_URL}/servicesSelected`)
    });
  }

  addEntry(entry: any): Observable<any> {
    return this.http.post(`${this.API_URL}/entries`, entry);
  }
  
  addSelectedService(service: any): Observable<any> {
    console.log(service)
    return this.http.post(`${this.API_URL}/servicesSelected`, service);
  }

}
