import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherWeighmentBillPrintComponent } from './other-weighment-bill-print.component';

describe('OtherWeighmentBillPrintComponent', () => {
  let component: OtherWeighmentBillPrintComponent;
  let fixture: ComponentFixture<OtherWeighmentBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherWeighmentBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherWeighmentBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
