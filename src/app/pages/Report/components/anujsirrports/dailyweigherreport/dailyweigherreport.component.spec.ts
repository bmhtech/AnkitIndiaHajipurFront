import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyweigherreportComponent } from './dailyweigherreport.component';

describe('DailyweigherreportComponent', () => {
  let component: DailyweigherreportComponent;
  let fixture: ComponentFixture<DailyweigherreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyweigherreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyweigherreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
