import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { Service } from 'src/app/core/models/cart.model';
import { InsuranceComponent } from '../../added-services/insurance/insurance.component';
import { TradeInComponent } from '../../added-services/trade-in/trade-in.component';
import { TradeUpComponent } from '../../added-services/trade-up/trade-up.component';

@Component({
    selector: 'app-added-service',
    templateUrl: './added-service.component.html',
    styleUrls: ['./added-service.component.scss'],
    standalone: false
})
export class AddedServiceComponent {
  @Input() service!: Service;
  @Input() sku!: string;
  @Output() deleteServiceEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalService: ModalService) {}

  deleteService(serviceId: string) {
    if (serviceId) {
      this.deleteServiceEvent.emit(serviceId);
    }
  }

  addService(code: string): void {
    let modalRef: any;

    switch(code) {
      case 'insurance':
        modalRef = this.modalService.openWithComponent(InsuranceComponent);
        break;
      case 'tradeIn':
        modalRef = this.modalService.openWithComponent(TradeInComponent);
        break;
      case 'tradeUp':
          this.modalService.openWithComponent(TradeUpComponent);
          break;
      default:
        console.error('No service code');
    }

    modalRef.instance.sku = this.sku;
  }

}
