import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBillPrintPopupComponent } from './sales-bill-print-popup.component';

describe('SalesBillPrintPopupComponent', () => {
  let component: SalesBillPrintPopupComponent;
  let fixture: ComponentFixture<SalesBillPrintPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesBillPrintPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBillPrintPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });





  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
