import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private _countryCode = 'ph';

  get countryCode(): string {
    return this._countryCode;
  }
  
  set countryCode(code: string) {
    this._countryCode = code;
  }
}