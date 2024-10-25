import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocaleService } from '../services/locale.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  // constructor(
  //   private route: ActivatedRoute,
  //   private localeService: LocaleService,
  // ) {}

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     const countryCode = params.get('countryCode') || 'uk';
  //     this.localeService.setLanguage(countryCode);
  //   });
  // }

}
