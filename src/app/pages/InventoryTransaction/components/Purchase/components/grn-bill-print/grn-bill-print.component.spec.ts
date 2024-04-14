import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnBillPrintComponent } from './grn-bill-print.component';

describe('GrnBillPrintComponent', () => {
  let component: GrnBillPrintComponent;
  let fixture: ComponentFixture<GrnBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
