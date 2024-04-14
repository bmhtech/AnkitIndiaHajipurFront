import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChallanJobworkPopupComponent } from './delivery-challan-jobwork-popup.component';

describe('DeliveryChallanJobworkPopupComponent', () => {
  let component: DeliveryChallanJobworkPopupComponent;
  let fixture: ComponentFixture<DeliveryChallanJobworkPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChallanJobworkPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChallanJobworkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
