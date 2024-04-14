import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferChallanComponent } from './stock-transfer-challan.component';

describe('StockTransferChallanComponent', () => {
  let component: StockTransferChallanComponent;
  let fixture: ComponentFixture<StockTransferChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
