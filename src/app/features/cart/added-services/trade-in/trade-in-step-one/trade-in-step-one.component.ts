import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { TradeInField } from 'src/app/shared/constants/tradein.const';
import { BrandTI, CategoryTI, DeviceTI, StepOneDescription, StepOneField, TradeInOption } from 'src/app/core/models/tradein.model';
import { TradeInAccordionComponent } from 'src/app/features/cart/added-services/trade-in/trade-in-accordion/trade-in-accordion.component';
import { CurrencyBySitePipe } from 'src/app/shared/pipes/currency-by-site.pipe';
import { CommonModule } from '@angular/common';
import { map, skip, Subject, takeUntil } from 'rxjs';
import { MaxLengthBlockDirective } from 'src/app/shared/directives/max-length-block.directive';


@Component({
  selector: 'app-trade-in-step-one',
  templateUrl: './trade-in-step-one.component.html',
  styleUrl: './trade-in-step-one.component.scss',
  standalone: true,
  imports: [
    TradeInAccordionComponent, 
    ReactiveFormsModule, 
    CurrencyBySitePipe, 
    CommonModule,
    MaxLengthBlockDirective, 
  ]
})
export class TradeInStepOneComponent implements OnInit, OnDestroy {
  @Input() description: StepOneDescription | undefined;
  @Output() formReady = new EventEmitter<FormGroup>();
  fields: StepOneField[] = [];
  private unsubscribe$ = new Subject<void>();
  stepOneForm: FormGroup;
  category = '';
  categoryInitial = '';
  isPostalCodeValid = false;
  formData = {};
  summary = {
    brand: '',
    device: '',
    storage: '',
    finalAmount: 0
  };

  constructor(
    private fb: FormBuilder,
    private tradeInService: TradeInService,
  ) {
    this.stepOneForm = this.fb.group({
      postalCode: ['', 
        [
          Validators.required, 
          Validators.minLength(4),
        ]
      ],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      device: ['', Validators.required],
      storage: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.formReady.emit(this.stepOneForm);

    this.tradeInService.getTradeInSteps()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        if (res && res[0]) {
          this.fields = res[0]?.stepOne;
          this.summary = res[0]?.summary;
          this.formData = res[0]?.formData;
        }

        if (
          this.formData &&
          typeof this.formData === 'object' &&
          Object.keys(this.formData).length > 0
        ) {
          console.log('hello')
          this.stepOneForm.patchValue(this.formData);
          this.isPostalCodeValid = true;
          console.log('fields', this.fields)
        } else {
          console.log('world')
          const categoryOptions = this.fields?.find(f => f.fieldName === TradeInField.CATEGORY)?.options;
          this.categoryInitial = categoryOptions?.[0]?.code || '';
          this.getBrands(this.categoryInitial);
          this.categoryField?.setValue(this.categoryInitial);
          this.setFieldValue(TradeInField.CATEGORY, this.categoryInitial);
          // this.resetDropdownForm();
        }
      });

    this.postalCode?.valueChanges
      .pipe(
        skip(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(v => {
        this.isPostalCodeValid = false;
        this.resetDropdownForm();
      });
  }

  onCategorySelect() {
    const category = this.categoryField?.value;
    this.setFieldValue(TradeInField.CATEGORY, category);
    this.category = category;
    this.getBrands(category);
    this.resetDropdownForm();
  }

  resetDropdownForm(): void {
    console.log('resetdropdown')
    this.stepOneForm.patchValue({
      brand: '',
      device: '',
      storage: ''
    });

    this.setFieldContent(TradeInField.DEVICE, []);
    this.setFieldContent(TradeInField.STORAGE, []);
    this.setFieldValue(TradeInField.BRAND, '');
  }

  get categoryField(): FormControl | null {
    return this.stepOneForm.get(TradeInField.CATEGORY) as FormControl;
  }

  get postalCode(): FormControl | null {
    return this.stepOneForm.get(TradeInField.POSTAL_CODE) as FormControl;
  }

  checkPostalCode(): void {
    const validPostalCodes = this.fields?.find(f => f.fieldName === TradeInField.POSTAL_CODE)?.options;
    const code = this.postalCode?.value;

    if (validPostalCodes && validPostalCodes?.length && code && validPostalCodes.includes(code)) {
      this.postalCode?.setErrors(null);
      this.isPostalCodeValid = true;
      this.setFieldValue(TradeInField.POSTAL_CODE, code);
    } else {
      this.postalCode?.setErrors({ invalidPostalCode: true });
      this.isPostalCodeValid = false;
    }
  }

  getBrands(category: string): void {
    this.tradeInService.getBrandsByCategory(category).subscribe((res: BrandTI[]) => {
      this.setFieldContent(TradeInField.BRAND, res);
    });
  }

  getDevices(categoryCode: string, brandCode: string): void {
    this.tradeInService.getDevicesByCategoryAndBrand(categoryCode, brandCode).subscribe(res => {
      this.setFieldContent(TradeInField.DEVICE, res);
    })
  }

  getStorages(deviceCode: string): void {
    this.tradeInService.getStoragesByDevice(deviceCode).subscribe(res => {
      this.setFieldContent(TradeInField.STORAGE, res);
    })
  }

  setFieldContent(fieldName: string, value: any) {
    const field = this.fields?.find(f => f.fieldName === fieldName);
    if (field) field.options = value;
  }

  setFieldValue(fieldName: string, value: string): void {
    const field = this.fields?.find(f => f.fieldName === fieldName);
    if (field) field.value = value;
  }

  onSelectItem(item: any): void {
    if (!item) return;

    if (item.code.includes(TradeInField.BRAND)) {
      this.setFieldValue(TradeInField.BRAND, item.name);
      this.getDevices(item.categoryCode, item.code);
      this.summary.brand = item.name;
      this.stepOneForm.patchValue({
        device: '',
        storage: ''
      });

      this.setFieldContent(TradeInField.STORAGE, []);
      this.setFieldValue(TradeInField.DEVICE, '');
    }

    if (item.code.includes(TradeInField.DEVICE)) {
      this.setFieldValue(TradeInField.DEVICE, item.name);
      this.getStorages(item.code);
      this.summary.device = item.name;
      this.stepOneForm.patchValue({
        storage: ''
      });
      this.setFieldValue(TradeInField.STORAGE, '');
    }

    if (item.code.includes('stor')) {
      this.setFieldValue(TradeInField.STORAGE, item.name);
      this.summary.storage = item.name;
      this.summary.finalAmount = item.amount;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
