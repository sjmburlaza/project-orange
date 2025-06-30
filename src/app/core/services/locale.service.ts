import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private languageMap: { [key: string]: string } = {
    'uk': 'en-GB',
    'tw': 'zh-TW'
  }

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  setLanguage(countryCode: string) {
    const language = this.languageMap[countryCode] || 'en-GB';
    this.translate.use(language);
  }
}
