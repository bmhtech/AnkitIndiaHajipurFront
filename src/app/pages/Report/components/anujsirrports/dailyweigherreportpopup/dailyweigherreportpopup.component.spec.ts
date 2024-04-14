import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyweigherreportpopupComponent } from './dailyweigherreportpopup.component';

describe('DailyweigherreportpopupComponent', () => {
  let component: DailyweigherreportpopupComponent;
  let fixture: ComponentFixture<DailyweigherreportpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyweigherreportpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyweigherreportpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
