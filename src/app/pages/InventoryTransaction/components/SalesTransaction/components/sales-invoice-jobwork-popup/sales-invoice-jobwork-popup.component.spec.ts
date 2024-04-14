import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceJobworkPopupComponent } from './sales-invoice-jobwork-popup.component';

describe('SalesInvoiceJobworkPopupComponent', () => {
  let component: SalesInvoiceJobworkPopupComponent;
  let fixture: ComponentFixture<SalesInvoiceJobworkPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceJobworkPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceJobworkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
