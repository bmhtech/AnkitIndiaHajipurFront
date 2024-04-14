import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferChallanPopUpComponent } from './stock-transfer-challan-pop-up.component';

describe('StockTransferChallanPopUpComponent', () => {
  let component: StockTransferChallanPopUpComponent;
  let fixture: ComponentFixture<StockTransferChallanPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferChallanPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferChallanPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
