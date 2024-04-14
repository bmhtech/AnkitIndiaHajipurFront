import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPriceListComponent } from './daily-price-list.component';

describe('DailyPriceListComponent', () => {
  let component: DailyPriceListComponent;
  let fixture: ComponentFixture<DailyPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
