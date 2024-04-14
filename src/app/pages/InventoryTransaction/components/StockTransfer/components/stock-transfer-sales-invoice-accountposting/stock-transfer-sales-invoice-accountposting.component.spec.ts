import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferSalesInvoiceAccountpostingComponent } from './stock-transfer-sales-invoice-accountposting.component';

describe('StockTransferSalesInvoiceAccountpostingComponent', () => {
  let component: StockTransferSalesInvoiceAccountpostingComponent;
  let fixture: ComponentFixture<StockTransferSalesInvoiceAccountpostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferSalesInvoiceAccountpostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferSalesInvoiceAccountpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
