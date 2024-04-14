import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferSaleInvoicePrintComponent } from './stock-transfer-sale-invoice-print.component';

describe('StockTransferSaleInvoicePrintComponent', () => {
  let component: StockTransferSaleInvoicePrintComponent;
  let fixture: ComponentFixture<StockTransferSaleInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferSaleInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferSaleInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
