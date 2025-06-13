import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent {
  @Input() product!: ProductModel;
  @Output() addToCartEvent = new EventEmitter<ProductModel>();

  ngOnInit() {}

  addToCart(product: ProductModel): void {
    if (product) {
      this.addToCartEvent.emit(product);
    }
  }

}
