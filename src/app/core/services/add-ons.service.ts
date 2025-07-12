import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOn } from '../models/add-on.model';

@Injectable({
  providedIn: 'root'
})
export class AddOnsService {
  private http = inject(HttpClient);
  private API_URL = '/api';


  getAddOns(): Observable<AddOn[]> {
    return this.http.get<AddOn[]>(`${this.API_URL}/addOns`);
  }
}
