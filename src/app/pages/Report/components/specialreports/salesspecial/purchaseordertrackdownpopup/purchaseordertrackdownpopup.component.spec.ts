import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordertrackdownpopupComponent } from './purchaseordertrackdownpopup.component';

describe('PurchaseordertrackdownpopupComponent', () => {
  let component: PurchaseordertrackdownpopupComponent;
  let fixture: ComponentFixture<PurchaseordertrackdownpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordertrackdownpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordertrackdownpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
