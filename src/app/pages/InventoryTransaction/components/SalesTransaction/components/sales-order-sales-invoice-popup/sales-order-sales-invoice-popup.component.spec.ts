import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderSalesInvoicePopupComponent } from './sales-order-sales-invoice-popup.component';

describe('SalesOrderSalesInvoicePopupComponent', () => {
  let component: SalesOrderSalesInvoicePopupComponent;
  let fixture: ComponentFixture<SalesOrderSalesInvoicePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderSalesInvoicePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderSalesInvoicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
