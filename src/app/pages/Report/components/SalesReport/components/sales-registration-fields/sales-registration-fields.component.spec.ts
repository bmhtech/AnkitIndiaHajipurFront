import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRegistrationFieldsComponent } from './sales-registration-fields.component';

describe('SalesRegistrationFieldsComponent', () => {
  let component: SalesRegistrationFieldsComponent;
  let fixture: ComponentFixture<SalesRegistrationFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRegistrationFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRegistrationFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
