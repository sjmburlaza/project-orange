import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightHandSideComponent } from './right-hand-side.component';

describe('RightHandSideComponent', () => {
  let component: RightHandSideComponent;
  let fixture: ComponentFixture<RightHandSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightHandSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightHandSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
