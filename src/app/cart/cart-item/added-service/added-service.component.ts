import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Service } from 'src/app/shared/models/cart.model';
import { InsuranceComponent } from '../../added-services/insurance/insurance.component';
import { TradeInComponent } from '../../added-services/trade-in/trade-in.component';
import { TradeUpComponent } from '../../added-services/trade-up/trade-up.component';

@Component({
  selector: 'app-added-service',
  templateUrl: './added-service.component.html',
  styleUrls: ['./added-service.component.scss']
})
export class AddedServiceComponent {
  @Input() service: Service | undefined;
  @Input() sku: string | undefined;

  constructor(private modalService: ModalService) {}

  deleteService() {
    
  }

  addService(code: string | undefined): void {
    switch(code) {
      case 'insurance':
        const modalRef: any = this.modalService.openWithComponent(InsuranceComponent);
        modalRef.instance.sku = this.sku;
        break;
      case 'tradeIn':
        this.modalService.openWithComponent(TradeInComponent);
        break;
      case 'tradeUp':
          this.modalService.openWithComponent(TradeUpComponent);
          break;
      default:
        console.error('No service code');
    }
  }

}
