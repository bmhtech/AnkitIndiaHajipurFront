import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBusinessUnitMasterComponent } from './company-business-unit-master.component';

describe('CompanyBusinessUnitMasterComponent', () => {
  let component: CompanyBusinessUnitMasterComponent;
  let fixture: ComponentFixture<CompanyBusinessUnitMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBusinessUnitMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBusinessUnitMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
