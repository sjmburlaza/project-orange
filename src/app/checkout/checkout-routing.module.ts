import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DeliveryStepComponent } from './delivery-step/delivery-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';


const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      { path: 'details', component: CustomerDetailsComponent },
      { path: 'delivery', component: DeliveryStepComponent },
      { path: 'payment', component: PaymentStepComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
