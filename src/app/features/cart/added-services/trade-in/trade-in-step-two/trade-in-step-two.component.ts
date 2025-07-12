import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { StepTwo } from 'src/app/core/models/tradein.model';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { REGEX_PATTERN } from 'src/app/shared/constants/regex.const';
import { MaxLengthBlockDirective } from 'src/app/shared/directives/max-length-block.directive';

@Component({
  selector: 'app-trade-in-step-two',
  templateUrl: './trade-in-step-two.component.html',
  styleUrl: './trade-in-step-two.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MaxLengthBlockDirective, 
    CommonModule
  ]
})
export class TradeInStepTwoComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private tradeInService = inject(TradeInService);
  @Output() formReady = new EventEmitter<FormGroup>();
  private unsubscribe$ = new Subject<void>();
  stepTwoData: StepTwo | undefined;
  stepTwoForm: FormGroup;

  constructor() {
    this.stepTwoForm = this.fb.group({
      imei: ['', 
        [
          Validators.required, 
          Validators.minLength(15),
          Validators.pattern(REGEX_PATTERN.DIGITS_ONLY)
        ]
      ]
    })
  }

  ngOnInit(): void {
    this.formReady.emit(this.stepTwoForm);

    this.tradeInService.getTradeInSteps().pipe(
      map((steps: any) => {
        if (steps) return steps[1]?.stepTwo || {};
      })
    ).subscribe(res => {
      this.stepTwoData = res;
      this.imei?.setValue(this.stepTwoData?.imei.value);
    });

    this.imei?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(value => {
        console.log('imei', value)
        if (this.stepTwoData && this.stepTwoData.imei )this.stepTwoData.imei.value = value;
      })
  }

  get imei(): FormControl | null {
    return this.stepTwoForm.get('imei') as FormControl;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
