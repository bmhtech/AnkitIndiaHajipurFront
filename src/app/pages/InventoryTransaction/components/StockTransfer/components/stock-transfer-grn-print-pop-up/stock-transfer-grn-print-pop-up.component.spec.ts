import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferGrnPrintPopUpComponent } from './stock-transfer-grn-print-pop-up.component';

describe('StockTransferGrnPrintPopUpComponent', () => {
  let component: StockTransferGrnPrintPopUpComponent;
  let fixture: ComponentFixture<StockTransferGrnPrintPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferGrnPrintPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferGrnPrintPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
