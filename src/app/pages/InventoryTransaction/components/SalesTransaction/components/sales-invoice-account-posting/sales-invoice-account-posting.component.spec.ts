import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceAccountPostingComponent } from './sales-invoice-account-posting.component';

describe('SalesInvoiceAccountPostingComponent', () => {
  let component: SalesInvoiceAccountPostingComponent;
  let fixture: ComponentFixture<SalesInvoiceAccountPostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceAccountPostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceAccountPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
