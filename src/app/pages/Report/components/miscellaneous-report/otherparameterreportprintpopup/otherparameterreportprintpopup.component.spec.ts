import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherparameterreportprintpopupComponent } from './otherparameterreportprintpopup.component';

describe('OtherparameterreportprintpopupComponent', () => {
  let component: OtherparameterreportprintpopupComponent;
  let fixture: ComponentFixture<OtherparameterreportprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherparameterreportprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherparameterreportprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
