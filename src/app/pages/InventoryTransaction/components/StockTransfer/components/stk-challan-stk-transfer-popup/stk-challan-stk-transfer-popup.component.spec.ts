import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkChallanStkTransferPopupComponent } from './stk-challan-stk-transfer-popup.component';

describe('StkChallanStkTransferPopupComponent', () => {
  let component: StkChallanStkTransferPopupComponent;
  let fixture: ComponentFixture<StkChallanStkTransferPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkChallanStkTransferPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkChallanStkTransferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
