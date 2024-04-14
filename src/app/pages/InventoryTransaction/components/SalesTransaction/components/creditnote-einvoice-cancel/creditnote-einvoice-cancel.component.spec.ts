import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnoteEinvoiceCancelComponent } from './creditnote-einvoice-cancel.component';

describe('CreditnoteEinvoiceCancelComponent', () => {
  let component: CreditnoteEinvoiceCancelComponent;
  let fixture: ComponentFixture<CreditnoteEinvoiceCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditnoteEinvoiceCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditnoteEinvoiceCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
