import { CommonModule } from '@angular/common';
import { 
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  signal, 
  SimpleChanges 
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Subject, takeUntil } from 'rxjs';
import { Field } from 'src/app/core/models/tradein.model';
import { CurrencyBySitePipe } from 'src/app/shared/pipes/currency-by-site.pipe';

@Component({
  selector: 'app-trade-in-accordion',
  templateUrl: './trade-in-accordion.component.html',
  styleUrl: './trade-in-accordion.component.scss',
  standalone: true,
  imports: [ 
    CommonModule, 
    MatExpansionModule, 
    CurrencyBySitePipe, 
    ReactiveFormsModule,
  ]
})
export class TradeInAccordionComponent implements OnInit {
  @Input() field!: Field;
  @Input() form!: FormGroup;
  @Input() category = '';
  @Output() onSelectItemEvent: EventEmitter<any> = new EventEmitter();
  private unsubscribe$ = new Subject<void>();
  readonly panelOpenState = signal(true);

  constructor() {}

  ngOnInit(): void {
    if (this.form && this.field.field) {
      const control = this.form.get(this.field.field);
      if (control) {
        control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
          // console.log('valueselect', value)
          this.onSelect(value);
        })
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.panelOpenState.set(true);
    }
  }

  onSelect(value: string): void {
    if (!value) return;
    const selectedItem = this.field.content.find((item: any) => item.code === value);
    this.onSelectItemEvent.emit(selectedItem);
    this.panelOpenState.set(false);
  }

  ngOnDestory(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
