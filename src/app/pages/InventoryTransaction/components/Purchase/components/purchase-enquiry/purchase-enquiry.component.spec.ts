import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEnquiryComponent } from './purchase-enquiry.component';

describe('PurchaseEnquiryComponent', () => {
  let component: PurchaseEnquiryComponent;
  let fixture: ComponentFixture<PurchaseEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
