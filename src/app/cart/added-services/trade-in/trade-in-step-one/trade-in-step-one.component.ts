import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { TradeInService } from 'src/app/services/trade-in.service';
import { BrandTI, Field } from 'src/app/shared/models/tradein.model';


@Component({
    selector: 'app-trade-in-step-one',
    templateUrl: './trade-in-step-one.component.html',
    styleUrl: './trade-in-step-one.component.scss',
    standalone: false
})
export class TradeInStepOneComponent {
  @Input() stepOneFields!: Field[];
  fieldsOriginal: Field[] = [];
  stepOneForm: FormGroup;
  fields: Field[] = [];
  category = '';
  private tradeInService = inject(TradeInService);

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

  ngOnInit() {
    this.fieldsOriginal = JSON.parse(JSON.stringify(this.stepOneFields));

    this.getBrands('cat_smartphone');

    this.stepOneForm.get('category')?.valueChanges.subscribe(category => {
      this.category = category;
      category = category === 'smartphone' ? 'cat_smartphone' : 'cat_tablet';
      this.getBrands(category);
    });
  }


  get postalCode() {
    return this.stepOneForm.get('postalCode');
  }

  checkPostalCode() {

  }

  getBrands(category: string): void {
    this.fields = this.stepOneFields.slice(0, 3);

    this.tradeInService.getBrandsByCategory(category).subscribe((res: BrandTI[]) => {
      const field = this.fields?.find(f => f.field === 'brand');
      if (field) field['content'] = res;
      const placeholder = this.fieldsOriginal?.find(f => f.field === 'brand')?.placeholder;
      if (placeholder) this.updatePlaceholder('brand', placeholder);
    });
  }

  updatePlaceholder(fieldName: string, placeholder: string): void {
    const field = this.fields.find(f => f.field === fieldName);
    if (field) field['placeholder'] = placeholder;
  }

  onSelectItem(item: any): void {
    console.log('item', item)
    if (item.code.includes('brand')) {
      this.fields = this.stepOneFields.slice(0, 4);
      this.updatePlaceholder('brand', item.name);
      this.getDevices(item.categoryCode, item.code);
    }

    if (item.code.includes('device')) {
      this.fields = this.stepOneFields.slice(0, 5);
      this.updatePlaceholder('device', item.name);
      this.getStorages(item.code);
    }

    if (item.code.includes('stor')) {
      this.updatePlaceholder('storage', item.name);
    }
  }

  getDevices(categoryCode: string, brandCode: string): void {
    this.tradeInService.getDevicesByCategoryAndBrand(categoryCode, brandCode).subscribe(res => {
      const deviceField = this.fields.find(f => f.field === 'device');
      if (deviceField) deviceField['content'] = res;
      const placeholder = this.fieldsOriginal?.find(f => f.field === 'device')?.placeholder;
      if (placeholder) this.updatePlaceholder('device', placeholder);
    })
  }

  getStorages(deviceCode: string): void {
    this.tradeInService.getStoragesByDevice(deviceCode).subscribe(res => {
      const storageField = this.fields.find(f => f.field === 'storage');
      if (storageField) storageField['content'] = res;
      const placeholder = this.fieldsOriginal?.find(f => f.field === 'storage')?.placeholder;
      if (placeholder) this.updatePlaceholder('storage', placeholder);
    })
  }

}
