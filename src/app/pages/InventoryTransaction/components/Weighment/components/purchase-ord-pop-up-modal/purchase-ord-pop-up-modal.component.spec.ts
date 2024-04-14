import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrdPopUpModalComponent } from './purchase-ord-pop-up-modal.component';

describe('PurchaseOrdPopUpModalComponent', () => {
  let component: PurchaseOrdPopUpModalComponent;
  let fixture: ComponentFixture<PurchaseOrdPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrdPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrdPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
