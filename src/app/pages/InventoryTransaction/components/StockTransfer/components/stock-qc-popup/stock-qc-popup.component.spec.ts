import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockQcPopupComponent } from './stock-qc-popup.component';

describe('StockQcPopupComponent', () => {
  let component: StockQcPopupComponent;
  let fixture: ComponentFixture<StockQcPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockQcPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockQcPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
