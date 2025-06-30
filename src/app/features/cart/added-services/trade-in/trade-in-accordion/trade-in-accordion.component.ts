import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Field } from 'src/app/core/models/tradein.model';
import { CurrencyBySitePipe } from 'src/app/shared/pipes/currency-by-site.pipe';

@Component({
  selector: 'app-trade-in-accordion',
  templateUrl: './trade-in-accordion.component.html',
  styleUrl: './trade-in-accordion.component.scss',
  standalone: true,
  imports: [ MatExpansionModule, CurrencyBySitePipe, CommonModule, ReactiveFormsModule ]
})
export class TradeInAccordionComponent implements OnInit {
  @Input() field!: Field;
  @Input() form!: FormGroup;
  @Input() category = '';
  @Output() onSelectItemEvent: EventEmitter<any> = new EventEmitter();
  readonly panelOpenState = signal(true);

  constructor() {}

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.panelOpenState.set(true);
    }
  }

  onSelect(item: any): void {
    this.onSelectItemEvent.emit(item);
    this.panelOpenState.set(false);
  }
}
