import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferOrderPopupComponent } from './stock-transfer-order-popup.component';

describe('StockTransferOrderPopupComponent', () => {
  let component: StockTransferOrderPopupComponent;
  let fixture: ComponentFixture<StockTransferOrderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferOrderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferOrderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
