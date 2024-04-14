import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicDatePopupComponent } from './periodic-date-popup.component';

describe('PeriodicDatePopupComponent', () => {
  let component: PeriodicDatePopupComponent;
  let fixture: ComponentFixture<PeriodicDatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicDatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
