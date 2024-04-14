import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferUnloadingAfterInvoiceComponent } from './stock-transfer-unloading-after-invoice.component';

describe('StockTransferUnloadingAfterInvoiceComponent', () => {
  let component: StockTransferUnloadingAfterInvoiceComponent;
  let fixture: ComponentFixture<StockTransferUnloadingAfterInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferUnloadingAfterInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferUnloadingAfterInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
