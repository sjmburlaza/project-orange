import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { RightHandSideComponent } from './right-hand-side/right-hand-side.component';
import { MainComponent } from './main/main.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListingComponent } from './cart/cart-item/product-listing/product-listing.component';
import { AddedServiceComponent } from './cart/cart-item/added-service/added-service.component';
import { TradeInComponent } from './cart/added-services/trade-in/trade-in.component';
import { TradeUpComponent } from './cart/added-services/trade-up/trade-up.component';
import { InsuranceComponent } from './cart/added-services/insurance/insurance.component';
import { SimPlanComponent } from './cart/added-services/sim-plan/sim-plan.component';
import { BroadbandPlanComponent } from './cart/added-services/broadband-plan/broadband-plan.component';
import { AddOnsComponent } from './cart/added-services/add-ons/add-ons.component';
import { DynamicFormComponent } from "./shared/components/dynamic-form/dynamic-form.component";
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/effects/cart.effects';
import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
    declarations: [
        AppComponent,
        CartComponent,
        RightHandSideComponent,
        MainComponent,
        CartItemComponent,
        NavBarComponent,
        ProductListingComponent,
        AddedServiceComponent,
        TradeInComponent,
        TradeUpComponent,
        InsuranceComponent,
        SimPlanComponent,
        BroadbandPlanComponent,
        AddOnsComponent,
        SafeHtmlPipe,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot({ cart: cartReducer }),
        EffectsModule.forRoot([CartEffects]),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        OverlayModule,
        PortalModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        DynamicFormComponent,
        ProductsModule,
        CheckoutModule
    ]
})
export class AppModule { }
