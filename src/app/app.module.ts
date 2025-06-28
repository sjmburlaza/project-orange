import { NgModule } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EmptyCartComponent } from './cart/empty-cart/empty-cart.component';
import { VoucherComponent } from './right-hand-side/voucher/voucher.component';
import { CtaComponent } from './right-hand-side/cta/cta.component';
import { RewardsComponent } from './right-hand-side/rewards/rewards.component';
import { SummaryComponent } from './right-hand-side/summary/summary.component';
import { ReasonsToBuyComponent } from './right-hand-side/reasons-to-buy/reasons-to-buy.component';
import { CurrencyBySitePipe } from "./shared/pipes/currency-by-site.pipe";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { TradeInStepOneComponent } from './cart/added-services/trade-in/trade-in-step-one/trade-in-step-one.component';
import { TradeInStepTwoComponent } from './cart/added-services/trade-in/trade-in-step-two/trade-in-step-two.component';
import { TradeInStepThreeComponent } from './cart/added-services/trade-in/trade-in-step-three/trade-in-step-three.component';
import { TradeInStepFourComponent } from './cart/added-services/trade-in/trade-in-step-four/trade-in-step-four.component';
import { TradeInAccordionComponent } from './cart/added-services/trade-in/trade-in-accordion/trade-in-accordion.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({ declarations: [
        AppComponent,
        ProductDetailComponent,
        CartComponent,
        EmptyCartComponent,
        MainComponent,
        CartItemComponent,
        NavBarComponent,
        ProductListingComponent,
        AddedServiceComponent,
        TradeInComponent,
        TradeInAccordionComponent,
        TradeInStepOneComponent,
        TradeInStepTwoComponent,
        TradeInStepThreeComponent,
        TradeInStepFourComponent,
        TradeUpComponent,
        InsuranceComponent,
        SimPlanComponent,
        BroadbandPlanComponent,
        AddOnsComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        StoreModule.forRoot({ cart: cartReducer }),
        EffectsModule.forRoot([CartEffects]),
        AppRoutingModule,
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
        CheckoutModule,
        SafeHtmlPipe,
        CurrencyBySitePipe,
        MatDialogModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        RightHandSideComponent,
    ], 
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
