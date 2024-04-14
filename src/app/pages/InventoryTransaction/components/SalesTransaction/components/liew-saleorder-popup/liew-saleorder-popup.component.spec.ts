import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiewSaleorderPopupComponent } from './liew-saleorder-popup.component';

describe('LiewSaleorderPopupComponent', () => {
  let component: LiewSaleorderPopupComponent;
  let fixture: ComponentFixture<LiewSaleorderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiewSaleorderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiewSaleorderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
