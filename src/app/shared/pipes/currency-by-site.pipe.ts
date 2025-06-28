import { Pipe, PipeTransform } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';

@Pipe({
  name: 'currencyBySite',
  standalone: true
})
export class CurrencyBySitePipe implements PipeTransform {

  constructor(
    private countryService: CountryService,
  ) {}

  transform(value: string | number | undefined): string {
    if (!value) return '';

    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numericValue)) return String(value);

    const sitecode = this.countryService.countryCode;
    const currencyConfig = this.getCurrencyFormat(sitecode);

    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.currency
    }).format(numericValue);

  }

  getCurrencyFormat(sitecode: string): {locale: string; currency: string} {
    const map: { [key: string]: { locale: string; currency: string } } = {
      us: {locale: 'en-US', currency: 'USD'},
      ph: { locale: 'en-PH', currency: 'PHP' },
      jp: { locale: 'ja-JP', currency: 'JPY' },
      gb: { locale: 'en-GB', currency: 'GBP' },
      eu: { locale: 'fr-FR', currency: 'EUR' }
    }

    return map[sitecode] || map['us'];
  }

}
