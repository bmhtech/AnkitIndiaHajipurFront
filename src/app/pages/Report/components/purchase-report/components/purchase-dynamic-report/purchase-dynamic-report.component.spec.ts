import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDynamicReportComponent } from './purchase-dynamic-report.component';

describe('PurchaseDynamicReportComponent', () => {
  let component: PurchaseDynamicReportComponent;
  let fixture: ComponentFixture<PurchaseDynamicReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDynamicReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDynamicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
