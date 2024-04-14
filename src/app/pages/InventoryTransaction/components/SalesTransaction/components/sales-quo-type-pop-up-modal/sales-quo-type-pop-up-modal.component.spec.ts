import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuoTypePopUpModalComponent } from './sales-quo-type-pop-up-modal.component';

describe('SalesQuoTypePopUpModalComponent', () => {
  let component: SalesQuoTypePopUpModalComponent;
  let fixture: ComponentFixture<SalesQuoTypePopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuoTypePopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuoTypePopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
