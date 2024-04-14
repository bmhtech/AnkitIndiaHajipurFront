import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferInvoiceComponent } from './stock-transfer-invoice.component';

describe('StockTransferInvoiceComponent', () => {
  let component: StockTransferInvoiceComponent;
  let fixture: ComponentFixture<StockTransferInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
