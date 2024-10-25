import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerDetailsComponent } from './checkout/customer-details/customer-details.component';
import { DeliveryStepComponent } from './checkout/delivery-step/delivery-step.component';
import { PaymentStepComponent } from './checkout/payment-step/payment-step.component';
import { MainComponent } from './main/main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { 
    path: ':countryCode', 
    component: MainComponent, 
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'p/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { 
        path: 'checkout', 
        component: CheckoutComponent,
        children: [
          { path: 'details', component: CustomerDetailsComponent },
          { path: 'delivery', component: DeliveryStepComponent },
          { path: 'payment', component: PaymentStepComponent },
        ]
      },
    ]
  },
  { path: '', redirectTo: '/uk', pathMatch: 'full' },
  { path: '**', redirectTo: '/uk' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
