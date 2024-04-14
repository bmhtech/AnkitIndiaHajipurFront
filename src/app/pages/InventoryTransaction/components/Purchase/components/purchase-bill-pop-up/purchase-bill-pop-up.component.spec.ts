import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBillPopUpComponent } from './purchase-bill-pop-up.component';

describe('PurchaseBillPopUpComponent', () => {
  let component: PurchaseBillPopUpComponent;
  let fixture: ComponentFixture<PurchaseBillPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseBillPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBillPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
