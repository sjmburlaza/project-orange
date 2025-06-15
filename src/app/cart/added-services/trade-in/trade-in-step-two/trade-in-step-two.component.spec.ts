import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInStepTwoComponent } from './trade-in-step-two.component';

describe('TradeInStepTwoComponent', () => {
  let component: TradeInStepTwoComponent;
  let fixture: ComponentFixture<TradeInStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInStepTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeInStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
