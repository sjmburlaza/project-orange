import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeInService } from 'src/app/services/trade-in.service';
import { TradeIn, StepHeader } from 'src/app/shared/models/tradein.model';

@Component({
    selector: 'app-trade-in',
    templateUrl: './trade-in.component.html',
    styleUrls: ['./trade-in.component.scss'],
    standalone: false
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
