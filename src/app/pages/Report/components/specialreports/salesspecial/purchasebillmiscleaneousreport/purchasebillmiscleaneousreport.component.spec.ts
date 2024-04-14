import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasebillmiscleaneousreportComponent } from './purchasebillmiscleaneousreport.component';

describe('PurchasebillmiscleaneousreportComponent', () => {
  let component: PurchasebillmiscleaneousreportComponent;
  let fixture: ComponentFixture<PurchasebillmiscleaneousreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasebillmiscleaneousreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasebillmiscleaneousreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
