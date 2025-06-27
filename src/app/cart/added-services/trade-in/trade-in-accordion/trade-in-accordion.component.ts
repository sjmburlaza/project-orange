import { Component, EventEmitter, Input, OnInit, Output, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/shared/models/tradein.model';

@Component({
  selector: 'app-trade-in-accordion',
  templateUrl: './trade-in-accordion.component.html',
  styleUrl: './trade-in-accordion.component.scss',
  standalone: false
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
