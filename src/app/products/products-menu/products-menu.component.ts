import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.scss']
})
export class ProductsMenuComponent {
  @Input() products!: ProductModel[];
  groups = [];

  constructor() {}

  

}
