import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherparameterreportComponent } from './otherparameterreport.component';

describe('OtherparameterreportComponent', () => {
  let component: OtherparameterreportComponent;
  let fixture: ComponentFixture<OtherparameterreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherparameterreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherparameterreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
