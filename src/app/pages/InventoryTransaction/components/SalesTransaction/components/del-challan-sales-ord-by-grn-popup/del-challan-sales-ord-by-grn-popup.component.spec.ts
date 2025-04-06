import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelChallanSalesOrdByGrnPopupComponent } from './del-challan-sales-ord-by-grn-popup.component';

describe('DelChallanSalesOrdByGrnPopupComponent', () => {
  let component: DelChallanSalesOrdByGrnPopupComponent;
  let fixture: ComponentFixture<DelChallanSalesOrdByGrnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelChallanSalesOrdByGrnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelChallanSalesOrdByGrnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
