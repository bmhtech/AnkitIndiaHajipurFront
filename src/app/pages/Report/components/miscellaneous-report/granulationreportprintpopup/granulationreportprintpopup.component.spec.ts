import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GranulationreportprintpopupComponent } from './granulationreportprintpopup.component';

describe('GranulationreportprintpopupComponent', () => {
  let component: GranulationreportprintpopupComponent;
  let fixture: ComponentFixture<GranulationreportprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GranulationreportprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GranulationreportprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
