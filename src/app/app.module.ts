import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { RightHandSideComponent } from './right-hand-side/right-hand-side.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerDetailsComponent } from './checkout/customer-details/customer-details.component';
import { DeliveryStepComponent } from './checkout/delivery-step/delivery-step.component';
import { PaymentStepComponent } from './checkout/payment-step/payment-step.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ProductsItemComponent } from './products/products-item/products-item.component';
import { ProductsMenuComponent } from './products/products-menu/products-menu.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    RightHandSideComponent,
    CheckoutComponent,
    CustomerDetailsComponent,
    DeliveryStepComponent,
    PaymentStepComponent,
    ProductDetailComponent,
    ProductsComponent,
    MainComponent,
    CartItemComponent,
    ProductsItemComponent,
    ProductsMenuComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
