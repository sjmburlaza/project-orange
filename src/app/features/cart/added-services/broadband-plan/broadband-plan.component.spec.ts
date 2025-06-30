import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadbandPlanComponent } from './broadband-plan.component';

describe('BroadbandPlanComponent', () => {
  let component: BroadbandPlanComponent;
  let fixture: ComponentFixture<BroadbandPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadbandPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroadbandPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
