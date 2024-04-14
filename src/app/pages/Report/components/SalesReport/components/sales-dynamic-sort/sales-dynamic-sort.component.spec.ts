import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDynamicSortComponent } from './sales-dynamic-sort.component';

describe('SalesDynamicSortComponent', () => {
  let component: SalesDynamicSortComponent;
  let fixture: ComponentFixture<SalesDynamicSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDynamicSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDynamicSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
