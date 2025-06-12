import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { DeliveryStepComponent } from './delivery-step/delivery-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '../shared/components/dynamic-form/dynamic-form.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CheckoutComponent,
    CustomerDetailsComponent,
    DeliveryStepComponent,
    PaymentStepComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormComponent,
    RouterModule,
    CheckoutRoutingModule,
  ]
})
export class CheckoutModule { }
