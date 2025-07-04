import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { TradeIn, StepHeader, StepOneField, StepTwo } from 'src/app/core/models/tradein.model';
import { TradeInStepOneComponent } from './trade-in-step-one/trade-in-step-one.component';
import { TradeInStepTwoComponent } from './trade-in-step-two/trade-in-step-two.component';
import { TradeInStepThreeComponent } from './trade-in-step-three/trade-in-step-three.component';
import { TradeInStepFourComponent } from './trade-in-step-four/trade-in-step-four.component';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/core/services/modal.service';
import { FormGroup } from '@angular/forms';

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
  @ViewChild(TradeInStepOneComponent) stepOneComponent?: TradeInStepOneComponent;
  @ViewChild(TradeInStepTwoComponent) stepTwoComponent?: TradeInStepTwoComponent;
  @ViewChild(TradeInStepThreeComponent) stepThreeComponent?: TradeInStepThreeComponent;
  currentStep = 1;
  tradeIn$: Observable<TradeIn>;
  tradeIn: TradeIn | undefined;
  steps: StepHeader[] = [];
  forms: { [step: number]: FormGroup } = {};
  formStatuses: { [step: number]: string } = {};
  stepOneData: StepOneField[] | undefined;
  stepTwoData: StepTwo | undefined;

  constructor(
    private modalService: ModalService,
    private tradeInService: TradeInService,
  ) {
    this.tradeIn$ = this.tradeInService.getTradeIn();
    this.tradeIn$.subscribe(res => {
      this.tradeIn = res;
      this.steps = res.stepsHeader
    });
  }

  ngOnInit() {
  }

  onFormReady(step: number, form: FormGroup) {
    this.forms[step] = form;
    form.statusChanges.subscribe(status => {
      setTimeout(() => {
        this.formStatuses[step] = status;
      });
    });
  }

  isButtonDisabled(step: number): boolean {
    return this.formStatuses[step] !== 'VALID';
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      if (this.currentStep === 1 && this.stepOneComponent) {
        const stepOneData = this.stepOneComponent.fields;
        const formData = this.stepOneComponent.stepOneForm.value;
        const summary = this.stepOneComponent?.summary;
        this.tradeInService.updateStepOne(stepOneData, formData, summary).subscribe();
      }
      if (this.currentStep === 2 && this.stepTwoComponent) {
        const stepTwoData = this.stepTwoComponent.stepTwoData;
        this.tradeInService.updateStepTwo(stepTwoData).subscribe();
      }
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  close(): void {
    this.modalService.closeAll();
    const stepOneData = this.stepOneComponent?.fields;
    const formData = {};
    const summary = this.stepOneComponent?.summary;

    stepOneData?.map(s => {
      if (!(s.fieldName === 'postalCode' || s.fieldName === 'category')) {
        s.options = [];
      }
      s.value = '';
    });

    this.tradeInService.updateStepOne(stepOneData, formData, summary).subscribe();

    const stepTwoData = this.stepTwoComponent?.stepTwoData;
    if (stepTwoData && stepTwoData.imei) stepTwoData.imei.value = '';
    this.tradeInService.updateStepTwo(stepTwoData).subscribe();
  }
}
