import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBillPrintOptionsPopupComponent } from './sales-bill-print-options-popup.component';

describe('SalesBillPrintOptionsPopupComponent', () => {
  let component: SalesBillPrintOptionsPopupComponent;
  let fixture: ComponentFixture<SalesBillPrintOptionsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesBillPrintOptionsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBillPrintOptionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
