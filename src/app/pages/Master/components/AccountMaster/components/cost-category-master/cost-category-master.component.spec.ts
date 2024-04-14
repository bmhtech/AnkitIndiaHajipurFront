import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCategoryMasterComponent } from './cost-category-master.component';

describe('CostCategoryMasterComponent', () => {
  let component: CostCategoryMasterComponent;
  let fixture: ComponentFixture<CostCategoryMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCategoryMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
