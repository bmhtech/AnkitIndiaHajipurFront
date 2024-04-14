import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurOrderMiscRepPopupComponent } from './pur-order-misc-rep-popup.component';

describe('PurOrderMiscRepPopupComponent', () => {
  let component: PurOrderMiscRepPopupComponent;
  let fixture: ComponentFixture<PurOrderMiscRepPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurOrderMiscRepPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurOrderMiscRepPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
