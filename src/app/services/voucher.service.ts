import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voucher } from '../shared/models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private API_URL = '/api/vouchers';

  constructor(private http: HttpClient) {}

  getVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.API_URL}`);
  }

  updateIsApplied(id: string, isApplied: boolean): Observable<Voucher> {
    return this.http.patch<Voucher>(`${this.API_URL}/${id}`, { isApplied });
  }
}
