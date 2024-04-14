import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesinvoicesummaryreportComponent } from './salesinvoicesummaryreport.component';

describe('SalesinvoicesummaryreportComponent', () => {
  let component: SalesinvoicesummaryreportComponent;
  let fixture: ComponentFixture<SalesinvoicesummaryreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesinvoicesummaryreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesinvoicesummaryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
