import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/overlay.service';
import { Service } from 'src/app/shared/models/cart.model';
import { InsuranceComponent } from '../../added-services/insurance/insurance.component';

@Component({
  selector: 'app-added-service',
  templateUrl: './added-service.component.html',
  styleUrls: ['./added-service.component.scss']
})
export class AddedServiceComponent {
  @Input() service: Service | undefined;

  constructor(private modalService: ModalService) {}

  deleteService() {
    
  }

  addService(): void {
    this.modalService.openWithComponent(InsuranceComponent);
  }

}
