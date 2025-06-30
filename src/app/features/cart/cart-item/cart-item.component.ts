import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { getUniqueObjects } from 'src/app/shared/helpers/utils';
import { Service } from 'src/app/core/models/cart.model';
import { CartState } from 'src/app/store/reducers/cart.reducer';
import * as CartActions from '../../../store/actions/cart.actions';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    standalone: false
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  @Input() servicesAvailable: any;
  @Input() servicesSelected: any;
  itemServices: Service[] = [];

  constructor(
    public cartService: CartService,
    private store: Store<CartState>,
  ) {}

  ngOnInit(): void {
    this.itemServices = this.getServices();
  }

  getServices(): Service[] {
    const services = [
      ...this.getItemServices(this.servicesAvailable),
      ...this.getItemServices(this.servicesSelected),
    ]

    return getUniqueObjects(services, service => service?.code);
  }

  getItemServices(services: Service[]): Service[] {
    return services.filter((s: Service) => s.skuApplicable.includes(this.item.sku));
  }

  deleteService(serviceId: string): void {
    this.cartService.deleteService(serviceId).pipe(take(1)).subscribe({
      next: () => this.store.dispatch(CartActions.loadCart()),
      error: (err) => console.error('Delete failed', err)
    });
  }

  deleteEntry(entryId: string): void {
    this.cartService.deleteEntry(entryId).pipe(take(1)).subscribe({
      next: () => this.store.dispatch(CartActions.loadCart()),
      error: (err) => console.error('Delete entry failed', err)
    })
  }
}
