import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEnqPopUpModalComponent } from './purchase-enq-pop-up-modal.component';

describe('PurchaseEnqPopUpModalComponent', () => {
  let component: PurchaseEnqPopUpModalComponent;
  let fixture: ComponentFixture<PurchaseEnqPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseEnqPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEnqPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
