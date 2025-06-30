import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/core/services/cart.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { Service } from 'src/app/core/models/cart.model';
import { CartState } from 'src/app/store/reducers/cart.reducer';
import * as CartActions from 'src/app/store/actions/cart.actions';
import * as CartSelectors from 'src/app/store/selectors/cart.selectors';

@Component({
    selector: 'app-insurance',
    templateUrl: './insurance.component.html',
    styleUrls: ['./insurance.component.scss'],
    standalone: false
})
export class InsuranceComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  insurance: Service | undefined;
  sku!: string;
  form = this.formBuilder.group({
    selectedPlan: [null, Validators.required],
    tnc: [false, Validators.requiredTrue]
  })

  constructor(
    public cartService: CartService,
    private modalService: ModalService,
    private store: Store<CartState>,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.store.select(CartSelectors.selectServicesAvailable).subscribe((services) => {
      this.insurance = services.find((s: any) => s.code === 'insurance');
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
    const selectedService: Partial<Service> = {
      code,
      name,
      plan,
      skuApplicable: [this.sku]
    };

    this.store.dispatch(CartActions.addSelectedService({ service: selectedService }));
    this.store.dispatch(CartActions.loadCart());
    this.close();
  }

}
