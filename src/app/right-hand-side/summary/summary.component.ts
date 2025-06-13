import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  items = [
    {
      code: 'SUBTOTAL',
      name: 'Subtotal',
      amount: {
        value: 8000,
        formattedValue: '8000.00'
      }
    },
    {
      code: 'PROMO_DISCOUNT',
      name: 'Promotional Discount',
      amount: {
        value: 200,
        formattedValue: '200.00'
      }
    },
    {
      code: 'DELIVERY',
      name: 'Delivery',
      amount: {
        value: 100,
        formattedValue: '100.00'
      }
    },
    {
      code: 'SPECIAL_DISCOUNT',
      name: 'Special Discount',
      amount: {
        value: 50,
        formattedValue: '50'
      }
    },
    {
      code: 'TAX',
      name: 'Tax',
      amount: {
        value: 38,
        formattedValue: '38'
      }
    },
  ]
}
