import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderReturnapprovalPopupComponent } from './sales-order-returnapproval-popup.component';

describe('SalesOrderReturnapprovalPopupComponent', () => {
  let component: SalesOrderReturnapprovalPopupComponent;
  let fixture: ComponentFixture<SalesOrderReturnapprovalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderReturnapprovalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderReturnapprovalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
