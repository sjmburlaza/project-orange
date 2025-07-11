import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { SummaryService } from 'src/app/core/services/summary.service';
import { Summary, SummaryItem } from 'src/app/core/models/summary.model';
import { CurrencyBySitePipe } from 'src/app/shared/pipes/currency-by-site.pipe';

@Component({
    selector: 'app-summary',
    imports: [CommonModule, CurrencyBySitePipe],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss',
    standalone: true
})
export class SummaryComponent {
  summary$: Observable<Summary>;

  constructor(
    private summaryService: SummaryService,
  ) {
    this.summary$ = this.summaryService.getSummary();
  }

}
