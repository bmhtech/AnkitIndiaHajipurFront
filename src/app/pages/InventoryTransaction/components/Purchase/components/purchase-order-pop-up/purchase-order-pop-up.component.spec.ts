import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderPopUpComponent } from './purchase-order-pop-up.component';

describe('PurchaseOrderPopUpComponent', () => {
  let component: PurchaseOrderPopUpComponent;
  let fixture: ComponentFixture<PurchaseOrderPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
