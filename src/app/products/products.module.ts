import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { ProductsItemComponent } from './products-item/products-item.component';
import { ProductsMenuComponent } from './products-menu/products-menu.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsComponent,
    ProductsItemComponent,
    ProductsMenuComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
