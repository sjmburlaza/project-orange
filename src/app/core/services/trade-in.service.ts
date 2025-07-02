import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeIn } from 'src/app/core/models/tradein.model';

@Injectable({
  providedIn: 'root'
})
export class TradeInService {
  private API_URL = '/api';

  constructor(
    private http: HttpClient
  ) { }

  getTradeIn(): Observable<TradeIn> {
    return this.http.get<TradeIn>(`${this.API_URL}/tradeIn`);
  }

  getTradeInSteps() {
    return this.http.get(`${this.API_URL}/tradeInSteps`);
  }

  updateStepOne(stepOneData: any) {
    return this.http.patch(`${this.API_URL}/tradeInSteps/1`, {stepOne: stepOneData});
  }

  // GET /tradeInBrands?categoryCode=cat_smartphone
  getBrandsByCategory(categoryCode: string): Observable<any> {
    return this.http.get(`${this.API_URL}/tradeInBrands`, {
      params: { categoryCode }
    });
  }

  // GET /tradeInDevices?categoryCode=cat_smartphone&brandCode=brand_apple
  getDevicesByCategoryAndBrand(categoryCode: string, brandCode: string) {
    return this.http.get(`${this.API_URL}/tradeInDevices`, {
      params: { categoryCode, brandCode }
    });
  }

  getStoragesByDevice(deviceCode: string) {
    return this.http.get(`${this.API_URL}/tradeInStorages`, {
      params: { deviceCode }
    });
  }
}
