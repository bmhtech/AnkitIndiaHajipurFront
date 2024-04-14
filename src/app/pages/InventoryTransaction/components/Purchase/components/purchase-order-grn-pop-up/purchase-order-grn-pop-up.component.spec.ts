import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderGrnPopUpComponent } from './purchase-order-grn-pop-up.component';

describe('PurchaseOrderGrnPopUpComponent', () => {
  let component: PurchaseOrderGrnPopUpComponent;
  let fixture: ComponentFixture<PurchaseOrderGrnPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderGrnPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderGrnPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
