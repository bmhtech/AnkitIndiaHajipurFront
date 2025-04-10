import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DchallanWeighmentFromGrnPrintComponent } from './dchallan-weighment-from-grn-print.component';

describe('DchallanWeighmentFromGrnPrintComponent', () => {
  let component: DchallanWeighmentFromGrnPrintComponent;
  let fixture: ComponentFixture<DchallanWeighmentFromGrnPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DchallanWeighmentFromGrnPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DchallanWeighmentFromGrnPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
