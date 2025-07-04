import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeIn, TradeInStep } from 'src/app/core/models/tradein.model';

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

  getTradeInSteps(): Observable<TradeInStep> {
    return this.http.get<TradeInStep>(`${this.API_URL}/tradeInSteps`);
  }

  updateStepOne(stepOne: any, formData: any, summary: any) {
    return this.http.patch(`${this.API_URL}/tradeInSteps/1`, 
      { stepOne, formData, summary }
    );
  }

  updateStepTwo(stepTwo: any) {
    return this.http.patch(`${this.API_URL}/tradeInSteps/2`, { stepTwo });
  }

  updateStepThree(stepThree: any) {
    return this.http.patch(`${this.API_URL}/tradeInSteps/3`, { stepThree });
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
