import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInStepFourComponent } from './trade-in-step-four.component';

describe('TradeInStepFourComponent', () => {
  let component: TradeInStepFourComponent;
  let fixture: ComponentFixture<TradeInStepFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInStepFourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeInStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
