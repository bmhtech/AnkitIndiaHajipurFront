import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderPopUpComponent } from './sales-order-pop-up.component';

describe('SalesOrderPopUpComponent', () => {
  let component: SalesOrderPopUpComponent;
  let fixture: ComponentFixture<SalesOrderPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
