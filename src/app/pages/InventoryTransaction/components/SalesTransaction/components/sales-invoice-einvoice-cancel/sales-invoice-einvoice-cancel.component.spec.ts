import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceEinvoiceCancelComponent } from './sales-invoice-einvoice-cancel.component';

describe('SalesInvoiceEinvoiceCancelComponent', () => {
  let component: SalesInvoiceEinvoiceCancelComponent;
  let fixture: ComponentFixture<SalesInvoiceEinvoiceCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceEinvoiceCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceEinvoiceCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
