import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentreMasterComponent } from './cost-centre-master.component';

describe('CostCentreMasterComponent', () => {
  let component: CostCentreMasterComponent;
  let fixture: ComponentFixture<CostCentreMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCentreMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCentreMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
