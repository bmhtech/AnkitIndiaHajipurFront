import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReportFieldsComponent } from './purchase-report-fields.component';

describe('PurchaseReportFieldsComponent', () => {
  let component: PurchaseReportFieldsComponent;
  let fixture: ComponentFixture<PurchaseReportFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReportFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReportFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
