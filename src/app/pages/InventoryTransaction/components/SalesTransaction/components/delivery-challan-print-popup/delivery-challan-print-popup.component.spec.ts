import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChallanPrintPopupComponent } from './delivery-challan-print-popup.component';

describe('DeliveryChallanPrintPopupComponent', () => {
  let component: DeliveryChallanPrintPopupComponent;
  let fixture: ComponentFixture<DeliveryChallanPrintPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChallanPrintPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChallanPrintPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
