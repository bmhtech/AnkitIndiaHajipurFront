import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreportSortingComponent } from './salesreport-sorting.component';

describe('SalesreportSortingComponent', () => {
  let component: SalesreportSortingComponent;
  let fixture: ComponentFixture<SalesreportSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesreportSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesreportSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});