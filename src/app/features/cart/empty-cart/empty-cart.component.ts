import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';

@Component({
    selector: 'app-empty-cart',
    templateUrl: './empty-cart.component.html',
    styleUrl: './empty-cart.component.scss',
    standalone: false
})
export class EmptyCartComponent {

  constructor(
    private router: Router,
    public countryService: CountryService,
  ) {}

  continueShopping(): void {
    const c = this.countryService.countryCode;
    this.router.navigate(['/', c, 'products']);
  }

  signIn(): void {

  }

}
