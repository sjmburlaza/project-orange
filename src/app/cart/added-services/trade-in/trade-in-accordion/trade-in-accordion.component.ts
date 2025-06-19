import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Step } from 'src/app/shared/models/cart.model';

@Component({
    selector: 'app-trade-in-accordion',
    templateUrl: './trade-in-accordion.component.html',
    styleUrl: './trade-in-accordion.component.scss',
    standalone: false
})
export class TradeInAccordionComponent implements OnInit {
  @Input() fieldData!: Step;
  @Input() form!: FormGroup;
  placeholder: string = '';

  constructor() {}

  ngOnInit() {
    this.placeholder = this.fieldData?.placeholder ?? '';
    console.log('fielddata', this.fieldData)
  }

  onSelect(itemName: string): void {
    this.placeholder = itemName;
  }
}
