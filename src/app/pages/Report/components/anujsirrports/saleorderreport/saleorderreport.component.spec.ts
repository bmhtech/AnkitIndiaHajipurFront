import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderreportComponent } from './saleorderreport.component';

describe('SaleorderreportComponent', () => {
  let component: SaleorderreportComponent;
  let fixture: ComponentFixture<SaleorderreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleorderreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleorderreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
