import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSalesReturnPopupComponent } from './multiple-sales-return-popup.component';

describe('MultipleSalesReturnPopupComponent', () => {
  let component: MultipleSalesReturnPopupComponent;
  let fixture: ComponentFixture<MultipleSalesReturnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleSalesReturnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleSalesReturnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
