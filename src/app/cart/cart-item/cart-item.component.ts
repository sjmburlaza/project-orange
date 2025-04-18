import { Component, Input, OnInit } from '@angular/core';
import { getUniqueObjects } from 'src/app/shared/helpers/utils';
import { Service } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  @Input() servicesAvailable: any;
  @Input() servicesSelected: any;
  itemServices: Service[] = [];

  constructor() {}

  ngOnInit(): void {
    this.itemServices = this.getServices();
    console.log(this.itemServices)
  }

  getServices(): Service[] {
    const services = [
      ...this.getItemServices(this.servicesAvailable),
      ...this.getItemServices(this.servicesSelected),
    ]

    return getUniqueObjects(services, service => service?.code);
  }

  getItemServices(services: Service[]): Service[] {
    return services.filter((s: Service) => s.skuApplicable.includes(this.item.code));
  }
}
