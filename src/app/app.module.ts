import { NgModule } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './features/cart/cart.component';
import { RightHandSideComponent } from './features/right-hand-side/right-hand-side.component';
import { MainComponent } from './features/main/main.component';
import { CartItemComponent } from './features/cart/cart-item/cart-item.component';
import { NavBarComponent } from './features/main/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListingComponent } from './features/cart/cart-item/product-listing/product-listing.component';
import { AddedServiceComponent } from './features/cart/cart-item/added-service/added-service.component';
import { TradeInComponent } from './features/cart/added-services/trade-in/trade-in.component';
import { TradeUpComponent } from './features/cart/added-services/trade-up/trade-up.component';
import { InsuranceComponent } from './features/cart/added-services/insurance/insurance.component';
import { SimPlanComponent } from './features/cart/added-services/sim-plan/sim-plan.component';
import { BroadbandPlanComponent } from './features/cart/added-services/broadband-plan/broadband-plan.component';
import { AddOnsComponent } from './features/cart/added-services/add-ons/add-ons.component';
import { DynamicFormComponent } from "./shared/components/dynamic-form/dynamic-form.component";
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/effects/cart.effects';
import { ProductsModule } from './features/products/products.module';
import { CheckoutModule } from './features/checkout/checkout.module';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { EmptyCartComponent } from './features/cart/empty-cart/empty-cart.component';
import { CurrencyBySitePipe } from "./shared/pipes/currency-by-site.pipe";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaxLengthBlockDirective } from 'src/app/shared/directives/max-length-block.directive';

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
        MatTooltipModule,
        RightHandSideComponent,
        TradeInComponent,
    ], 
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
