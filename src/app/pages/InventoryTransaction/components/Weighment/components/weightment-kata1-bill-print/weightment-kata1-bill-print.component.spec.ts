import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightmentKata1BillPrintComponent } from './weightment-kata1-bill-print.component';

describe('WeightmentKata1BillPrintComponent', () => {
  let component: WeightmentKata1BillPrintComponent;
  let fixture: ComponentFixture<WeightmentKata1BillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightmentKata1BillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightmentKata1BillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
