import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { TradeInField } from 'src/app/shared/constants/tradein.const';
import { BrandTI, Field } from 'src/app/core/models/tradein.model';
import { TradeInAccordionComponent } from 'src/app/features/cart/added-services/trade-in/trade-in-accordion/trade-in-accordion.component';
import { CurrencyBySitePipe } from 'src/app/shared/pipes/currency-by-site.pipe';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';


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
  ]
})
export class TradeInStepOneComponent implements OnInit, OnDestroy {
  fields: Field[] = [];
  description: any;
  private unsubscribe$ = new Subject<void>();
  stepOneForm: FormGroup;
  category = '';
  categoryInitial = '';
  isPostalCodeValid = false;
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
          Validators.maxLength(4), 
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
    this.tradeInService.getTradeIn().subscribe(res => {
      this.description = res.stepOneDescription;
    })
    this.tradeInService.getTradeInSteps()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        if (res) this.fields = res[0]?.stepOne;
        const storage = this.fields?.find(f => f.field === TradeInField.STORAGE)?.value;

        if (!storage) {
          this.categoryInitial = this.fields?.find(f => f.field === TradeInField.CATEGORY)?.content[0]?.code;
          this.getBrands(this.categoryInitial);
          this.categoryField?.setValue(this.categoryInitial);
          this.setFieldValue(TradeInField.CATEGORY, this.categoryInitial);
        } else {
          const postalCode = this.fields?.find(f => f.field === TradeInField.POSTAL_CODE)?.value;
          const category = this.fields?.find(f => f.field === TradeInField.CATEGORY)?.value;
          this.postalCode?.setValue(postalCode);
          this.categoryField?.setValue(category);
          this.isPostalCodeValid = true;
        }
      });

    this.postalCode?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isPostalCodeValid = false;
        this.resetForm();
      });
  }

  onCategorySelect() {
    const category = this.categoryField?.value;
    this.setFieldValue(TradeInField.CATEGORY, category);
    this.category = category;
    this.getBrands(category);
    this.resetForm();

    const df = this.fields?.find(f => f.field === TradeInField.DEVICE);
    const sf = this.fields?.find(f => f.field === TradeInField.STORAGE);
    if (df) df.content = [];
    if (sf) sf.content = [];

    this.setFieldValue(TradeInField.BRAND, '');
  }

  resetForm(): void {
    this.stepOneForm.patchValue({
      brand: '',
      device: '',
      storage: ''
    });
  }

  get categoryField(): FormControl | null {
    return this.stepOneForm.get(TradeInField.CATEGORY) as FormControl;
  }

  get postalCode(): FormControl | null {
    return this.stepOneForm.get(TradeInField.POSTAL_CODE) as FormControl;
  }

  checkPostalCode(): void {
    const validPostalCodes = this.fields?.find(f => f.field === TradeInField.POSTAL_CODE)?.content;
    const code = this.postalCode?.value;

    if (!validPostalCodes || !code) return;

    if (validPostalCodes.includes(code)) {
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
      const bf = this.fields?.find(f => f.field === TradeInField.BRAND);
      if (bf) bf.content = res;
    });
  }

  getDevices(categoryCode: string, brandCode: string): void {
    this.tradeInService.getDevicesByCategoryAndBrand(categoryCode, brandCode).subscribe(res => {
      const deviceField = this.fields?.find(f => f.field === TradeInField.DEVICE);
      if (deviceField) deviceField.content = res;
    })
  }

  getStorages(deviceCode: string): void {
    this.tradeInService.getStoragesByDevice(deviceCode).subscribe(res => {
      const storageField = this.fields?.find(f => f.field === TradeInField.STORAGE);
      if (storageField) storageField.content = res;
    })
  }

  setFieldValue(fieldName: string, value: string): void {
    const field = this.fields?.find(f => f.field === fieldName);
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
      const sf = this.fields?.find(f => f.field === TradeInField.STORAGE);
      if (sf) sf.content = [];
      
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
