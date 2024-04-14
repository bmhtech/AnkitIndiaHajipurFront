import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailygetwheatreportComponent } from './dailygetwheatreport.component';

describe('DailygetwheatreportComponent', () => {
  let component: DailygetwheatreportComponent;
  let fixture: ComponentFixture<DailygetwheatreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailygetwheatreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailygetwheatreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
