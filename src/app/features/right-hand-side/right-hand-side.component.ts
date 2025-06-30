import { Component } from '@angular/core';
import { CtaComponent } from './cta/cta.component';
import { ReasonsToBuyComponent } from './reasons-to-buy/reasons-to-buy.component';
import { RewardsComponent } from './rewards/rewards.component';
import { SummaryComponent } from './summary/summary.component';
import { VoucherComponent } from './voucher/voucher.component';

@Component({
  selector: 'app-right-hand-side',
  templateUrl: './right-hand-side.component.html',
  styleUrls: ['./right-hand-side.component.scss'],
  imports: [
    VoucherComponent,
    SummaryComponent,
    RewardsComponent,
    CtaComponent,
    ReasonsToBuyComponent,
  ],
  standalone: true
})
export class RightHandSideComponent {

}
