import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOpeningStockComponent } from './item-opening-stock.component';

describe('ItemOpeningStockComponent', () => {
  let component: ItemOpeningStockComponent;
  let fixture: ComponentFixture<ItemOpeningStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOpeningStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOpeningStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
