import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { TradeIn, StepHeader } from 'src/app/core/models/tradein.model';
import { TradeInStepOneComponent } from './trade-in-step-one/trade-in-step-one.component';
import { TradeInStepTwoComponent } from './trade-in-step-two/trade-in-step-two.component';
import { TradeInStepThreeComponent } from './trade-in-step-three/trade-in-step-three.component';
import { TradeInStepFourComponent } from './trade-in-step-four/trade-in-step-four.component';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/core/services/modal.service';

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
    CommonModule,
  ]
})
export class TradeInComponent implements OnInit {
  @ViewChild(TradeInStepOneComponent)
  stepOneComponent?: TradeInStepOneComponent;
  currentStep = 1;
  tradeIn$: Observable<TradeIn>;
  steps: StepHeader[] = [];

  constructor(
    private modalService: ModalService,
    private tradeInService: TradeInService,
  ) {
    this.tradeIn$ = this.tradeInService.getTradeIn();
    this.tradeIn$.subscribe(res => this.steps = res.stepsHeader);
  }

  ngOnInit() {
    this.stepOneComponent?.stepOneForm.statusChanges.subscribe(status => {
      console.log('stepOneForm status', status)
    })
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      if (this.currentStep === 1 && this.stepOneComponent) {
        if (!this.stepOneComponent.stepOneForm.valid) {
          this.stepOneComponent.stepOneForm.markAllAsTouched();
          return;
        }
        const stepOneData = this.stepOneComponent.fields;
        this.tradeInService.updateStepOne(stepOneData).subscribe();
      }
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

  close(): void {
    this.modalService.closeAll();
    const stepOneData = this.stepOneComponent?.fields;
    stepOneData?.map(s => {
      if (!(s.field === 'postalCode' || s.field === 'category')) {
        s.content = [];
      }
      s.value = '';
    });
    this.tradeInService.updateStepOne(stepOneData).subscribe();
  }
}
