import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface VoucherModel {
  code?: string; 
  description?: string;
  isExpired?: boolean;
}

@Component({
  selector: 'app-voucher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.scss'
})
export class VoucherComponent {
  vf: FormGroup;
  appliedVouchers: VoucherModel[] = [
    {
      code: 'hello',
      description: 'congratulations on your 50% discount'
    },
    {
      code: 'world',
      description: 'congratulations on your 50% discount + 200 cashback + blackpink concert ticket for 2 pax'
    },
  ];

  validVouchers = [
    {
      code: 'hello',
      description: 'congratulations on your 50% discount'
    },
    {
      code: 'world',
      description: 'congratulations on your 50% discount + 200 cashback + blackpink concert ticket for 2 pax'
    },
    {
      code: 'YES',
    },
    {
      code: 'NO',
      isExpired: true,
    },
  ]

  constructor(private fb: FormBuilder) {
    this.vf = this.fb.group({
      voucherCode: ['', Validators.required]
    })
  }
  get voucherCode() {
    return this.vf.get('voucherCode');
  }

  removeInputCode() {
    this.voucherCode?.reset();
  }

  applyVoucher(): void {
    this.checkCode();
  }

  checkCode(): void {
    const code = this.voucherCode?.value;

    if (this.appliedVouchers.some(v => v.code === code)) {
      this.voucherCode?.setErrors({ duplicate: true });
    } else if (!this.validVouchers.some(v => v.code === code)) {
      this.voucherCode?.setErrors({ invalid: true });
    } else if (this.validVouchers?.find(v => v.code === code)?.isExpired) {
      this.voucherCode?.setErrors({ expired: true });
    } else {
      this.voucherCode?.setErrors({ valid: true });
    }
  }

  removeVoucher(voucherCode: string | undefined): void {
    if (voucherCode) {
      this.appliedVouchers = this.appliedVouchers.filter(v => v.code !== voucherCode);
    }
  }
}
