import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderMiscRepPopUpComponent } from './sales-order-misc-rep-pop-up.component';

describe('SalesOrderMiscRepPopUpComponent', () => {
  let component: SalesOrderMiscRepPopUpComponent;
  let fixture: ComponentFixture<SalesOrderMiscRepPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderMiscRepPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderMiscRepPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
