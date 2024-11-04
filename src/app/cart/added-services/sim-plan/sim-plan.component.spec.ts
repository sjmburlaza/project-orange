import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimPlanComponent } from './sim-plan.component';

describe('SimPlanComponent', () => {
  let component: SimPlanComponent;
  let fixture: ComponentFixture<SimPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
