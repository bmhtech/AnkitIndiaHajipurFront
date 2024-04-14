import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {SalesOrderPopUpModalComponent } from './sales-order-pop-up-modal.component';

describe('SalesOrderPopUpModalComponent', () => {
  let component: SalesOrderPopUpModalComponent;
  let fixture: ComponentFixture<SalesOrderPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
