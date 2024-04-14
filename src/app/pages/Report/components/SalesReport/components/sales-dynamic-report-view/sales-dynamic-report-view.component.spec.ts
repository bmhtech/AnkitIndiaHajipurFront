import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDynamicReportViewComponent } from './sales-dynamic-report-view.component';

describe('SalesDynamicReportViewComponent', () => {
  let component: SalesDynamicReportViewComponent;
  let fixture: ComponentFixture<SalesDynamicReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDynamicReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDynamicReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
