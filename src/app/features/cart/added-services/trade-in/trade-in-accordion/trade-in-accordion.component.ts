import { CommonModule } from '@angular/common';
import { 
  Component, 
  EventEmitter, 
  Input, 
  OnChanges, 
  OnInit, 
  Output, 
  signal, 
  SimpleChanges 
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Subject, takeUntil } from 'rxjs';
import { StepOneField } from 'src/app/core/models/tradein.model';
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
export class TradeInAccordionComponent implements OnInit, OnChanges {
  @Input() field!: StepOneField;
  @Input() form!: FormGroup;
  @Input() category = '';
  @Output() onSelectItemEvent: EventEmitter<any> = new EventEmitter();
  private unsubscribe$ = new Subject<void>();
  readonly panelOpenState = signal(true);
  

  ngOnInit(): void {
    if (this.form && this.field.fieldName) {
      const control = this.form.get(this.field.fieldName);
      if (control) {
        control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
          this.onSelect(value);
        })
      }
      if (this.field.value) {
        this.panelOpenState.set(false);
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
    const selectedItem = this.field.options.find((item: any) => item.code === value);
    this.onSelectItemEvent.emit(selectedItem);
    this.panelOpenState.set(false);
  }

  ngOnDestory(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
