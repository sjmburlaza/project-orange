import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { VoucherService } from 'src/app/core/services/voucher.service';
import { Voucher } from 'src/app/core/models/voucher.model';


@Component({
    selector: 'app-voucher',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './voucher.component.html',
    styleUrl: './voucher.component.scss',
    standalone: true
})
export class VoucherComponent {
  vf: FormGroup;
  appliedVouchers: Voucher[] = [];
  vouchers: Voucher[] = [];

  constructor(
    private fb: FormBuilder,
    private voucherService: VoucherService,
  ) {
    this.vf = this.fb.group({
      voucherCode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchVouchers();
  }

  fetchVouchers(): void {
    this.voucherService.getVouchers().pipe(take(1)).subscribe((vouchers) => {
      this.vouchers = vouchers;
      this.appliedVouchers = vouchers.filter(v => v.isApplied);
    });
  }

  get voucherCode() {
    return this.vf.get('voucherCode');
  }

  removeInputCode(): void {
    this.voucherCode?.reset();
  }

  applyVoucher(): void {
    this.checkCode();
  }

  checkCode(): void {
    const code = this.voucherCode?.value;

    if (this.appliedVouchers.some(v => v.code === code)) {
      this.voucherCode?.setErrors({ duplicate: true });
    } else if (!this.vouchers.some(v => v.code === code)) {
      this.voucherCode?.setErrors({ invalid: true });
    } else if (this.vouchers?.find(v => v.code === code)?.isExpired) {
      this.voucherCode?.setErrors({ expired: true });
    } else {
      this.voucherCode?.setErrors({ valid: true });
      const voucherId = this.vouchers?.find(v => v.code === code)?.id;
      if (voucherId) this.updateVoucherStatus(voucherId, true);
    }
  }

  updateVoucherStatus(id: string, isApplied: boolean): void {
    this.voucherService.updateVoucherStatus(id, isApplied).subscribe({
      next: () => {
        this.fetchVouchers();
      },
      error: (err) => {
        console.error('Error updating voucher', err);
      }
    })
  }

  removeVoucher(voucherId: string | undefined): void {
    if (voucherId) this.updateVoucherStatus(voucherId, false);
    this.voucherCode?.reset();
  }
}
