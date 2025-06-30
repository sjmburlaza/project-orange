import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-trade-in-step-three',
  templateUrl: './trade-in-step-three.component.html',
  styleUrl: './trade-in-step-three.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, MatTooltipModule]
})
export class TradeInStepThreeComponent implements OnInit {
  @Input() stepThreeData: any;
  stForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.stForm = this.fb.group({
      st: this.fb.array(
        this.stepThreeData.map(() =>
          this.fb.group({
            response: ['', Validators.required]
          })
        )
      )
    })
  }

}
