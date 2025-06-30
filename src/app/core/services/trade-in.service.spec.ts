import { TestBed } from '@angular/core/testing';

import { TradeInService } from './trade-in.service';

describe('TradeInService', () => {
  let service: TradeInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
