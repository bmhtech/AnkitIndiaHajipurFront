import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelChallanSalesOrdByGrnJobworkPopupComponent } from './del-challan-sales-ord-by-grn-jobwork-popup.component';

describe('DelChallanSalesOrdByGrnJobworkPopupComponent', () => {
  let component: DelChallanSalesOrdByGrnJobworkPopupComponent;
  let fixture: ComponentFixture<DelChallanSalesOrdByGrnJobworkPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelChallanSalesOrdByGrnJobworkPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelChallanSalesOrdByGrnJobworkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
