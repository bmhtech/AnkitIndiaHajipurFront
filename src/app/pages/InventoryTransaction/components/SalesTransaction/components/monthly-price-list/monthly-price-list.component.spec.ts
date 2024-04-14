import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPriceListComponent } from './monthly-price-list.component';

describe('MonthlyPriceListComponent', () => {
  let component: MonthlyPriceListComponent;
  let fixture: ComponentFixture<MonthlyPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
