import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInventoryChargesComponent } from './store-inventory-charges.component';

describe('StoreInventoryChargesComponent', () => {
  let component: StoreInventoryChargesComponent;
  let fixture: ComponentFixture<StoreInventoryChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreInventoryChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInventoryChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
