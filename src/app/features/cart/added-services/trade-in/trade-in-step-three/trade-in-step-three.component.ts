import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';
import { StepThreeField } from 'src/app/core/models/tradein.model';
import { TradeInService } from 'src/app/core/services/trade-in.service';

@Component({
  selector: 'app-trade-in-step-three',
  templateUrl: './trade-in-step-three.component.html',
  styleUrl: './trade-in-step-three.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule]
})
export class TradeInStepThreeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tradeInService = inject(TradeInService);
  @Output() formReady = new EventEmitter<FormGroup>();
  stepThreeData: StepThreeField[] | undefined;
  stForm!: FormGroup;


  ngOnInit(): void {
    this.tradeInService.getTradeInSteps().pipe(
      map((steps: any) => {
        if (steps) return steps[2]?.stepThree || [];
      })
    ).subscribe(res => {
      this.stepThreeData = res;
      this.buildForm(this.stepThreeData);
    });
  }

  buildForm(data: StepThreeField[] = []) {
    this.stForm = this.fb.group({
      st: this.fb.array(
        data.map((d) =>
          this.fb.group({
            response: [d.response, Validators.required]
          })
        )
      )
    })

    this.formReady.emit(this.stForm);
  }

}
