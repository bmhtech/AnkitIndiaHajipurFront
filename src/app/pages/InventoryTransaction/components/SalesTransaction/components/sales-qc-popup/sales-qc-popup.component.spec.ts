import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQcPopupComponent } from './sales-qc-popup.component';

describe('SalesQcPopupComponent', () => {
  let component: SalesQcPopupComponent;
  let fixture: ComponentFixture<SalesQcPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQcPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
