import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/overlay.service';
import { Cart } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent {
  insurance: any;

  constructor(
    public cartService: CartService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart) => {
      this.insurance = cart.servicesAvailable.find((s: any) => s.code === 'insurance');
    });
  }

  close() {
    this.modalService.closeAll();
  }

}
