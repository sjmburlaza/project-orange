import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { QuestionBase } from 'src/app/shared/models/question-base';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss'],
    standalone: false
})
export class CustomerDetailsComponent {
  questions$: Observable<any>;

  constructor(private cds: CustomerDetailsService) {
    this.questions$ = this.cds.getCustomerDetailsQuestions();
  }
}
