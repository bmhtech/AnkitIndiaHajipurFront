import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBillApprovalComponent } from './purchase-bill-approval.component';

describe('PurchaseBillApprovalComponent', () => {
  let component: PurchaseBillApprovalComponent;
  let fixture: ComponentFixture<PurchaseBillApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseBillApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBillApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
