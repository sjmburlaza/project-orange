import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInStepThreeComponent } from './trade-in-step-three.component';

describe('TradeInStepThreeComponent', () => {
  let component: TradeInStepThreeComponent;
  let fixture: ComponentFixture<TradeInStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeInStepThreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradeInStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
