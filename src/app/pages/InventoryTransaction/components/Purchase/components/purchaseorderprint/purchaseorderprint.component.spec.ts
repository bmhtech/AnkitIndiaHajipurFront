import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderprintComponent } from './purchaseorderprint.component';

describe('PurchaseorderprintComponent', () => {
  let component: PurchaseorderprintComponent;
  let fixture: ComponentFixture<PurchaseorderprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseorderprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
