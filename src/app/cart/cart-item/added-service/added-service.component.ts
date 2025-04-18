import { Component, Input } from '@angular/core';
import { Service } from 'src/app/shared/models/cart.model';

@Component({
  selector: 'app-added-service',
  templateUrl: './added-service.component.html',
  styleUrls: ['./added-service.component.scss']
})
export class AddedServiceComponent {
  @Input() service: Service | undefined;

  deleteService() {
    
  }

  addService(): void {

  }

}
