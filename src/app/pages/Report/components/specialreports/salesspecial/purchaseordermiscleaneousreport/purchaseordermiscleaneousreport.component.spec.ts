import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseordermiscleaneousreportComponent } from './purchaseordermiscleaneousreport.component';

describe('PurchaseordermiscleaneousreportComponent', () => {
  let component: PurchaseordermiscleaneousreportComponent;
  let fixture: ComponentFixture<PurchaseordermiscleaneousreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseordermiscleaneousreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseordermiscleaneousreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
