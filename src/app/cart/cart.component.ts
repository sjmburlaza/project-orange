import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { CartState } from '../store/reducers/cart.reducer';
import * as CartActions from '../store/actions/cart.actions';
import * as CartSelectors from '../store/selectors/cart.selectors';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: false
})
export class CartComponent implements OnInit {
  entries$: Observable<any[]>;
  servicesAvailable$: Observable<any[]>;
  servicesSelected$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<CartState>) {
    this.entries$ = this.store.select(CartSelectors.selectEntries);
    this.servicesAvailable$ = this.store.select(CartSelectors.selectServicesAvailable);
    this.servicesSelected$ = this.store.select(CartSelectors.selectServicesSelected);
    this.loading$ = this.store.select(CartSelectors.selectLoading);
    this.error$ = this.store.select(CartSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }
}
