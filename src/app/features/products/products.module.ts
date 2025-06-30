import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { ProductsItemComponent } from './products-item/products-item.component';
import { ProductsMenuComponent } from './products-menu/products-menu.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { CurrencyBySitePipe } from '../../shared/pipes/currency-by-site.pipe';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsItemComponent,
    ProductsMenuComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    CurrencyBySitePipe,
  ]
})
export class ProductsModule { }
