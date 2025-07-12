import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { StepFour } from 'src/app/core/models/tradein.model';
import { TradeInService } from 'src/app/core/services/trade-in.service';

@Component({
  selector: 'app-trade-in-step-four',
  templateUrl: './trade-in-step-four.component.html',
  styleUrl: './trade-in-step-four.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TradeInStepFourComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tradeInService = inject(TradeInService);
  @Output() formReady = new EventEmitter<FormGroup>();
  stepFourData$: Observable<StepFour> | undefined;
  stForm!: FormGroup;

  constructor() {
    this.stForm = this.fb.group({
      tnc1: [false, Validators.required],
      tnc2: [false, Validators.required],
    })
  }

  ngOnInit(): void {
    this.formReady.emit(this.stForm);

    this.stepFourData$ = this.tradeInService.getTradeInSteps().pipe(
      map((steps: any) => {
          if (steps) return steps[3]?.stepFour;
      })
    );
  }
}
