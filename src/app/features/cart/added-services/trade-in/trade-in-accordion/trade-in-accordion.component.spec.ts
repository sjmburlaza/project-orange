import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInAccordionComponent } from './trade-in-accordion.component';

describe('TradeInAccordionComponent', () => {
  let component: TradeInAccordionComponent;
  let fixture: ComponentFixture<TradeInAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeInAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
