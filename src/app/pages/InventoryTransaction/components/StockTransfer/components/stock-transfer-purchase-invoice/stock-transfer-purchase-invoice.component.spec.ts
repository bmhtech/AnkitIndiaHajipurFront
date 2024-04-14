import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferPurchaseInvoiceComponent } from './stock-transfer-purchase-invoice.component';

describe('StockTransferPurchaseInvoiceComponent', () => {
  let component: StockTransferPurchaseInvoiceComponent;
  let fixture: ComponentFixture<StockTransferPurchaseInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferPurchaseInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferPurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
