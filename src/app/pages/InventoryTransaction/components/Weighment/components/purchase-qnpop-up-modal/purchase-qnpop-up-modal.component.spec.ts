import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQNPopUpModalComponent } from './purchase-qnpop-up-modal.component';

describe('PurchaseQNPopUpModalComponent', () => {
  let component: PurchaseQNPopUpModalComponent;
  let fixture: ComponentFixture<PurchaseQNPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQNPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQNPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
