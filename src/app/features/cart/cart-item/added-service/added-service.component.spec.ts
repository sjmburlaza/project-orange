import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedServiceComponent } from './added-service.component';

describe('AddedServiceComponent', () => {
  let component: AddedServiceComponent;
  let fixture: ComponentFixture<AddedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
