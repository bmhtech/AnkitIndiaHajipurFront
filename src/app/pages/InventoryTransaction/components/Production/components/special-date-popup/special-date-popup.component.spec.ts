import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDatePopupComponent } from './special-date-popup.component';

describe('SpecialDatePopupComponent', () => {
  let component: SpecialDatePopupComponent;
  let fixture: ComponentFixture<SpecialDatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
