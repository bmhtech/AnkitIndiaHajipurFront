import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoicePopUpComponent } from './sales-invoice-pop-up.component';

describe('SalesInvoicePopUpComponent', () => {
  let component: SalesInvoicePopUpComponent;
  let fixture: ComponentFixture<SalesInvoicePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoicePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoicePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
