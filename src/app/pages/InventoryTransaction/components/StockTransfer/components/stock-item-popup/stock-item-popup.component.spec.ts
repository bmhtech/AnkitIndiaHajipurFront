import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockItemPopupComponent } from './stock-item-popup.component';

describe('StockItemPopupComponent', () => {
  let component: StockItemPopupComponent;
  let fixture: ComponentFixture<StockItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
