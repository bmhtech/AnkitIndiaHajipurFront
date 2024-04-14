import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesinvoiceMiscellaneousreportComponent } from './salesinvoice-miscellaneousreport.component';

describe('SalesinvoiceMiscellaneousreportComponent', () => {
  let component: SalesinvoiceMiscellaneousreportComponent;
  let fixture: ComponentFixture<SalesinvoiceMiscellaneousreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesinvoiceMiscellaneousreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesinvoiceMiscellaneousreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
