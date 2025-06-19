import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step } from 'src/app/shared/models/cart.model';

@Component({
    selector: 'app-trade-in-step-one',
    templateUrl: './trade-in-step-one.component.html',
    styleUrl: './trade-in-step-one.component.scss',
    standalone: false
})
export class TradeInStepOneComponent {
  @Input() stepOne!: Step[];
  stepOneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.stepOneForm = this.fb.group({
      postalCode: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      device: ['', Validators.required],
      storage: ['', Validators.required],
    })
  }

  get postalCode() {
    return this.stepOneForm.get('postalCode');
  }

  checkPostalCode() {

  }
}
