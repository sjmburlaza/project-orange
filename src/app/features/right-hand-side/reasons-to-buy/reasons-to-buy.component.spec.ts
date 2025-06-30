import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsToBuyComponent } from './reasons-to-buy.component';

describe('ReasonsToBuyComponent', () => {
  let component: ReasonsToBuyComponent;
  let fixture: ComponentFixture<ReasonsToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReasonsToBuyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReasonsToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
