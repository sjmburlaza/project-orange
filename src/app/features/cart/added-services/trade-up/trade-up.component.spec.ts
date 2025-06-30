import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeUpComponent } from './trade-up.component';

describe('TradeUpComponent', () => {
  let component: TradeUpComponent;
  let fixture: ComponentFixture<TradeUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
