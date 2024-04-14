import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferSaleInvoicePrintoptionComponent } from './stock-transfer-sale-invoice-printoption.component';

describe('StockTransferSaleInvoicePrintoptionComponent', () => {
  let component: StockTransferSaleInvoicePrintoptionComponent;
  let fixture: ComponentFixture<StockTransferSaleInvoicePrintoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferSaleInvoicePrintoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferSaleInvoicePrintoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
