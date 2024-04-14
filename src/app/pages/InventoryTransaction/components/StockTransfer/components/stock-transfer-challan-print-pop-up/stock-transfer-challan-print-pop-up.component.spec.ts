import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferChallanPrintPopUpComponent } from './stock-transfer-challan-print-pop-up.component';

describe('StockTransferChallanPrintPopUpComponent', () => {
  let component: StockTransferChallanPrintPopUpComponent;
  let fixture: ComponentFixture<StockTransferChallanPrintPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferChallanPrintPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferChallanPrintPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
