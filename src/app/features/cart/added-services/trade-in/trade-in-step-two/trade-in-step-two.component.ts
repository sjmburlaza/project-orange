import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_PATTERN } from 'src/app/shared/constants/regex.const';
import { MaxLengthBlockDirective } from 'src/app/shared/directives/max-length-block.directive';

@Component({
  selector: 'app-trade-in-step-two',
  templateUrl: './trade-in-step-two.component.html',
  styleUrl: './trade-in-step-two.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MaxLengthBlockDirective,]
})
export class TradeInStepTwoComponent {
  @Input() stepTwoData: any;
  stepTwoForm: FormGroup;

  constructor( private fb: FormBuilder ) {
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

  get imei(): FormControl | null {
    return this.stepTwoForm.get('imei') as FormControl;
  }

}
