import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillofSupplyPrintPopupComponent } from './billof-supply-print-popup.component';

describe('BillofSupplyPrintPopupComponent', () => {
  let component: BillofSupplyPrintPopupComponent;
  let fixture: ComponentFixture<BillofSupplyPrintPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillofSupplyPrintPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillofSupplyPrintPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
