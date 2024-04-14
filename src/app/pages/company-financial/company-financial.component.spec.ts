import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFinancialComponent } from './company-financial.component';

describe('CompanyFinancialComponent', () => {
  let component: CompanyFinancialComponent;
  let fixture: ComponentFixture<CompanyFinancialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFinancialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
