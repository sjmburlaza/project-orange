import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { TradeIn, StepHeader } from 'src/app/core/models/tradein.model';
import { TradeInStepOneComponent } from './trade-in-step-one/trade-in-step-one.component';
import { TradeInStepTwoComponent } from './trade-in-step-two/trade-in-step-two.component';
import { TradeInStepThreeComponent } from './trade-in-step-three/trade-in-step-three.component';
import { TradeInStepFourComponent } from './trade-in-step-four/trade-in-step-four.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade-in',
  templateUrl: './trade-in.component.html',
  styleUrls: ['./trade-in.component.scss'],
  standalone: true,
  imports: [
    TradeInStepOneComponent, 
    TradeInStepTwoComponent, 
    TradeInStepThreeComponent, 
    TradeInStepFourComponent,
    CommonModule
  ]
})
export class TradeInComponent implements OnInit {
  tradeInService = inject(TradeInService);
  currentStep = 1;
  tradeIn$: Observable<TradeIn>;
  steps: StepHeader[] = [];

  constructor() {
    this.tradeIn$ = this.tradeInService.getTradeIn();
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

  close() {
    
  }
}
