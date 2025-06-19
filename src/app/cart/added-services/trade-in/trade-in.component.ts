import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { StepHeader, TradeIn } from 'src/app/shared/models/cart.model';

@Component({
    selector: 'app-trade-in',
    templateUrl: './trade-in.component.html',
    styleUrls: ['./trade-in.component.scss'],
    standalone: false
})
export class TradeInComponent implements OnInit {
  currentStep = 1;
  tradeIn$: Observable<TradeIn>;
  steps: StepHeader[] = [];

  constructor(public cartService: CartService) {
    this.tradeIn$ = this.cartService.getTradeIn();
    this.tradeIn$.subscribe(res => this.steps = res.stepsHeader);
  }

  ngOnInit() {
    
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(index: number) {
    this.currentStep = index;
  }
}
