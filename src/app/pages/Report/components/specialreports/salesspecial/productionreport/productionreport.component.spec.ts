import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionreportComponent } from './productionreport.component';

describe('ProductionreportComponent', () => {
  let component: ProductionreportComponent;
  let fixture: ComponentFixture<ProductionreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
