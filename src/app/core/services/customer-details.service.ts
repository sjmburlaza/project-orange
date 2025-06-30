import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
  siteUid: string = 'ph';

  constructor(private http: HttpClient) {}

  getCustomerDetailsQuestions(): Observable<any> {
    return this.http.get<any>(`assets/mock-data/customer-details-forms/form-${this.siteUid}.json`);
  }
}
