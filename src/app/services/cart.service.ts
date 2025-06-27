import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

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

  deleteEntry(entryId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/entries/${entryId}`)
      .pipe(catchError(this.handleError));
  }
  
  addSelectedService(service: any): Observable<any> {
    return this.http.post(`${this.API_URL}/servicesSelected`, service);
  }

  deleteService(serviceId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/servicesSelected/${serviceId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Client-side or network error
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend error
      console.error(`Server returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

}
