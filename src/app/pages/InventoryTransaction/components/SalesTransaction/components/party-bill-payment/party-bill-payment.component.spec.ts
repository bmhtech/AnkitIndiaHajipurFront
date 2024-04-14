import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyBillPaymentComponent } from './party-bill-payment.component';

describe('PartyBillPaymentComponent', () => {
  let component: PartyBillPaymentComponent;
  let fixture: ComponentFixture<PartyBillPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyBillPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
