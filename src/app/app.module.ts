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
import { ItemComponent } from './cart/item/item.component';

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
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
