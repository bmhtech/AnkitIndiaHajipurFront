import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyBillPaymentToComponent } from './party-bill-payment-to.component';

describe('PartyBillPaymentToComponent', () => {
  let component: PartyBillPaymentToComponent;
  let fixture: ComponentFixture<PartyBillPaymentToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyBillPaymentToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyBillPaymentToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
