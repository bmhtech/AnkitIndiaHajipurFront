import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkGrnPurchasePopupComponent } from './stk-grn-purchase-popup.component';

describe('StkGrnPurchasePopupComponent', () => {
  let component: StkGrnPurchasePopupComponent;
  let fixture: ComponentFixture<StkGrnPurchasePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkGrnPurchasePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkGrnPurchasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
