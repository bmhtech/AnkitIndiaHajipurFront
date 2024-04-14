import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModeMasterComponent } from './payment-mode-master.component';

describe('PaymentModeMasterComponent', () => {
  let component: PaymentModeMasterComponent;
  let fixture: ComponentFixture<PaymentModeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentModeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
