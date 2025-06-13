import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  
  constructor(
    public countryService: CountryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('countryCode')!;
    this.countryService.countryCode = code;
  }

}
