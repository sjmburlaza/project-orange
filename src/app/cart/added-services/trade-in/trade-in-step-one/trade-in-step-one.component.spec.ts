import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInStepOneComponent } from './trade-in-step-one.component';

describe('TradeInStepOneComponent', () => {
  let component: TradeInStepOneComponent;
  let fixture: ComponentFixture<TradeInStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInStepOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeInStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
