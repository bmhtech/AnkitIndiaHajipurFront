import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferSalesInvoiceComponent } from './stock-transfer-sales-invoice.component';

describe('StockTransferSalesInvoiceComponent', () => {
  let component: StockTransferSalesInvoiceComponent;
  let fixture: ComponentFixture<StockTransferSalesInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferSalesInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
