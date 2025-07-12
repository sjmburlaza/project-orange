import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/core/models/cart.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: ProductModel;
}
