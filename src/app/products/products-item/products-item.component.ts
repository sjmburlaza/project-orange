import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { ProductModel } from 'src/app/shared/models/cart.model';

@Component({
    selector: 'app-products-item',
    templateUrl: './products-item.component.html',
    styleUrls: ['./products-item.component.scss'],
    standalone: false
})
export class ProductsItemComponent {
  @Input() product!: ProductModel;
  @Output() addToCartEvent = new EventEmitter<ProductModel>();

  constructor(
    private router: Router,
    public countryService: CountryService,
  ) {}

  goToCart(): void {
    const c = this.countryService.countryCode;
    this.router.navigate(['/', c, 'cart']);
  }

  addToCart(product: ProductModel): void {
    if (product) {
      this.addToCartEvent.emit(product);
      this.goToCart();
    }
  }
}
