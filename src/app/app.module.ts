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
import { ProductListingComponent } from './cart/cart-item/product-listing/product-listing.component';
import { AddedServiceComponent } from './cart/cart-item/added-service/added-service.component';
import { TradeInComponent } from './cart/added-services/trade-in/trade-in.component';
import { TradeUpComponent } from './cart/added-services/trade-up/trade-up.component';
import { InsuranceComponent } from './cart/added-services/insurance/insurance.component';
import { SimPlanComponent } from './cart/added-services/sim-plan/sim-plan.component';
import { BroadbandPlanComponent } from './cart/added-services/broadband-plan/broadband-plan.component';
import { AddOnsComponent } from './cart/added-services/add-ons/add-ons.component';

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
    NavBarComponent,
    ProductListingComponent,
    AddedServiceComponent,
    TradeInComponent,
    TradeUpComponent,
    InsuranceComponent,
    SimPlanComponent,
    BroadbandPlanComponent,
    AddOnsComponent
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
