import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../shared/models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private API_URL = '/api/summary';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<Summary> {
    return this.http.get<Summary>(`${this.API_URL}`);
  }
}
