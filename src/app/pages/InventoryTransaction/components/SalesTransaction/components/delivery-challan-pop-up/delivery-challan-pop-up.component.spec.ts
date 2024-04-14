import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChallanPopUpComponent } from './delivery-challan-pop-up.component';

describe('DeliveryChallanPopUpComponent', () => {
  let component: DeliveryChallanPopUpComponent;
  let fixture: ComponentFixture<DeliveryChallanPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChallanPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChallanPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
