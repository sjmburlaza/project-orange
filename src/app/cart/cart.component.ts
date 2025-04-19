import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$!: Observable<Cart>;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
  }
}
