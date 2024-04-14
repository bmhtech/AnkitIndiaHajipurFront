import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerCutReportComponent } from './power-cut-report.component';

describe('PowerCutReportComponent', () => {
  let component: PowerCutReportComponent;
  let fixture: ComponentFixture<PowerCutReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerCutReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerCutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
