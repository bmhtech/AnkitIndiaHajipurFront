import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranulationreportComponent } from './granulationreport.component';

describe('GranulationreportComponent', () => {
  let component: GranulationreportComponent;
  let fixture: ComponentFixture<GranulationreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranulationreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranulationreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
