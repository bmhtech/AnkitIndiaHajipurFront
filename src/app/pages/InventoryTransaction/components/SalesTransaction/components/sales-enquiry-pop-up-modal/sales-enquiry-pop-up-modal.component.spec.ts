import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEnquiryPopUpModalComponent } from './sales-enquiry-pop-up-modal.component';

describe('SalesEnquiry PopUpModalComponent', () => {
  let component: SalesEnquiryPopUpModalComponent;
  let fixture: ComponentFixture<SalesEnquiryPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEnquiryPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEnquiryPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
