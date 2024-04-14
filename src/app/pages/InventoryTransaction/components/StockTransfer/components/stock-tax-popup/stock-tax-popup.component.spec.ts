import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTaxPopupComponent } from './stock-tax-popup.component';

describe('StockTaxPopupComponent', () => {
  let component: StockTaxPopupComponent;
  let fixture: ComponentFixture<StockTaxPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTaxPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTaxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
