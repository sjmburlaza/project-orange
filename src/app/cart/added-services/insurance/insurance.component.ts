import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { Service } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  insurance: Service | undefined;
  sku: string | undefined;
  form = this.formBuilder.group({
    selectedPlan: [null, Validators.required],
    tnc: [false, Validators.requiredTrue]
  })

  constructor(
    public cartService: CartService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.insurance = cart.servicesAvailable.find((s: any) => s.code === 'insurance');
    });
  }

  close(): void {
    this.modalService.closeAll();
  }

  addToCart(): void {
    if (!this.insurance) return;

    const { code, name, details } = this.insurance;
    const selectedPlanCode = this.form?.value?.selectedPlan;
    const plan = details.plans.find((p: any) => p.code === selectedPlanCode);
    const selectedService = {
      code,
      name,
      plan,
      skuApplicable: [this.sku]
    };

    this.cartService.addSelectedService(selectedService).subscribe({
      next: () => {
        this.close();
      },
      error: (err) => console.error('Error adding service:', err)
    });
  }

}
