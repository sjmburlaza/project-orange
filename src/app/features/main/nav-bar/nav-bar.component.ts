// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    standalone: false
})
export class NavBarComponent {
  categories = [
    'Shop',
    'AI',
    'Mobile',
    'TV & AV',
    'Home Appliances',
    'Computing',
    'Displays',
    'Accessories',
    'SmartThings'
  ];

  constructor(
    private router: Router,
    public countryService: CountryService,
  ) {}

  goToCart(): void {
    const c = this.countryService.countryCode;
    this.router.navigate(['/', c, 'cart']);
  }
}
