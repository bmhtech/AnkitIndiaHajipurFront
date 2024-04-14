import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferPurchaseInvoiceAccountpostingComponent } from './stock-transfer-purchase-invoice-accountposting.component';

describe('StockTransferPurchaseInvoiceAccountpostingComponent', () => {
  let component: StockTransferPurchaseInvoiceAccountpostingComponent;
  let fixture: ComponentFixture<StockTransferPurchaseInvoiceAccountpostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferPurchaseInvoiceAccountpostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferPurchaseInvoiceAccountpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
