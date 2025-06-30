import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';
import { MainComponent } from './features/main/main.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';

const routes: Routes = [
  { 
    path: ':countryCode', 
    component: MainComponent, 
    children: [
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
      },
      { path: 'p/:id', component: ProductDetailComponent },

      { path: 'cart', component: CartComponent },
      {
        path: 'checkout',
        loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule)
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
