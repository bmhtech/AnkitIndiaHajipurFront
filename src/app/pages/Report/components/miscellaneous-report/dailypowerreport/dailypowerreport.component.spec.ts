import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailypowerreportComponent } from './dailypowerreport.component';

describe('DailypowerreportComponent', () => {
  let component: DailypowerreportComponent;
  let fixture: ComponentFixture<DailypowerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailypowerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailypowerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
