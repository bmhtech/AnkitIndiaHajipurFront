import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchageOrderItemDtlsPopUpComponent } from './purchage-order-item-dtls-pop-up.component';

describe('PurchageOrderItemDtlsPopUpComponent', () => {
  let component: PurchageOrderItemDtlsPopUpComponent;
  let fixture: ComponentFixture<PurchageOrderItemDtlsPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchageOrderItemDtlsPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchageOrderItemDtlsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
