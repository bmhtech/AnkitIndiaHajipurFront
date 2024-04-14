import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialproductionreportComponent } from './specialproductionreport.component';

describe('SpecialproductionreportComponent', () => {
  let component: SpecialproductionreportComponent;
  let fixture: ComponentFixture<SpecialproductionreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialproductionreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialproductionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
