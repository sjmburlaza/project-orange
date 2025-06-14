import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { 
    path: ':countryCode', 
    component: MainComponent, 
    children: [
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      { path: 'p/:id', component: ProductDetailComponent },

      { path: 'cart', component: CartComponent },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)
      },
    ]
  },
  { path: '', redirectTo: '/ph', pathMatch: 'full' },
  { path: '**', redirectTo: '/ph' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
