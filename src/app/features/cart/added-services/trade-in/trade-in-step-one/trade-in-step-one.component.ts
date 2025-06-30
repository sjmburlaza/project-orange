import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TradeInService } from 'src/app/core/services/trade-in.service';
import { TradeInField } from 'src/app/shared/constants/tradein.const';
import { BrandTI, Field } from 'src/app/core/models/tradein.model';
import { TradeInAccordionComponent } from '../trade-in-accordion/trade-in-accordion.component';
import { CurrencyBySitePipe } from 'src/app/shared/pipes/currency-by-site.pipe';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-trade-in-step-one',
  templateUrl: './trade-in-step-one.component.html',
  styleUrl: './trade-in-step-one.component.scss',
  standalone: true,
  imports: [TradeInAccordionComponent, ReactiveFormsModule, CurrencyBySitePipe, CommonModule]
})
export class TradeInStepOneComponent implements OnInit {
  @Input() stepOneFields!: Field[];
  @Input() description: any;
  fieldsOriginal: Field[] = [];
  stepOneForm: FormGroup;
  fields: Field[] = [];
  category = '';
  validPostalCodes: string[] = [];
  isPostalCodeValid = false;
  summary = {
    brand: '',
    device: '',
    storage: '',
    finalAmount: 0
  }

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

  ngOnInit() {
    this.fieldsOriginal = JSON.parse(JSON.stringify(this.stepOneFields));
    this.validPostalCodes = this.stepOneFields?.find(f => f.field === TradeInField.POSTAL_CODE)?.content;

    const categoryInitial = this.fieldsOriginal?.find(f => f.field === TradeInField.CATEGORY)?.content[0]?.code;

    this.getBrands(categoryInitial);
    this.categoryField?.setValue(categoryInitial);

    this.postalCode?.valueChanges.subscribe(() => {
      this.isPostalCodeValid = false;
      this.resetForm();
      this.getBrands(categoryInitial);
      this.categoryField?.setValue(categoryInitial);
    });

    this.categoryField?.valueChanges.subscribe(category => {
      this.category = category;
      this.getBrands(category);
      this.resetForm();
    });
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
    const code = this.postalCode?.value;
    if (!code) return;
    if (this.validPostalCodes.includes(code)) {
      this.postalCode?.setErrors(null);
      this.isPostalCodeValid = true;
    } else {
      this.postalCode?.setErrors({ invalidPostalCode: true });
      this.isPostalCodeValid = false;
    }
  }

  getBrands(category: string): void {
    this.fields = this.stepOneFields.slice(0, 3);

    this.tradeInService.getBrandsByCategory(category).subscribe((res: BrandTI[]) => {
      const field = this.fields?.find(f => f.field === TradeInField.BRAND);
      if (field) field.content = res;
      const placeholder = this.fieldsOriginal?.find(f => f.field === TradeInField.BRAND)?.placeholder;
      if (placeholder) this.updatePlaceholder(TradeInField.BRAND, placeholder);
    });
  }

  updatePlaceholder(fieldName: string, placeholder: string): void {
    const field = this.fields.find(f => f.field === fieldName);
    if (field) field.placeholder = placeholder;
  }

  onSelectItem(item: any): void {
    if (item.code.includes(TradeInField.BRAND)) {
      this.fields = this.stepOneFields.slice(0, 4);
      this.updatePlaceholder(TradeInField.BRAND, item.name);
      this.getDevices(item.categoryCode, item.code);
      this.summary.brand = item.name;
      this.stepOneForm.patchValue({
        device: '',
        storage: ''
      });
    }

    if (item.code.includes(TradeInField.DEVICE)) {
      this.fields = this.stepOneFields.slice(0, 5);
      this.updatePlaceholder(TradeInField.DEVICE, item.name);
      this.getStorages(item.code);
      this.summary.device = item.name;
      this.stepOneForm.patchValue({
        storage: ''
      });
    }

    if (item.code.includes('stor')) {
      this.updatePlaceholder(TradeInField.STORAGE, item.name);
      this.summary.storage = item.name;
      this.summary.finalAmount = item.value;
      console.log('form', this.stepOneForm)
    }
  }

  getDevices(categoryCode: string, brandCode: string): void {
    this.tradeInService.getDevicesByCategoryAndBrand(categoryCode, brandCode).subscribe(res => {
      const deviceField = this.fields.find(f => f.field === TradeInField.DEVICE);
      if (deviceField) deviceField.content = res;
      const placeholder = this.fieldsOriginal?.find(f => f.field === TradeInField.DEVICE)?.placeholder;
      if (placeholder) this.updatePlaceholder(TradeInField.DEVICE, placeholder);
    })
  }

  getStorages(deviceCode: string): void {
    this.tradeInService.getStoragesByDevice(deviceCode).subscribe(res => {
      const storageField = this.fields.find(f => f.field === TradeInField.STORAGE);
      if (storageField) storageField.content = res;
      const placeholder = this.fieldsOriginal?.find(f => f.field === TradeInField.STORAGE)?.placeholder;
      if (placeholder) this.updatePlaceholder(TradeInField.STORAGE, placeholder);
    })
  }

}
