import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightmentBillPrintComponent } from './weightment-bill-print.component';

describe('WeightmentBillPrintComponent', () => {
  let component: WeightmentBillPrintComponent;
  let fixture: ComponentFixture<WeightmentBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightmentBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightmentBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
