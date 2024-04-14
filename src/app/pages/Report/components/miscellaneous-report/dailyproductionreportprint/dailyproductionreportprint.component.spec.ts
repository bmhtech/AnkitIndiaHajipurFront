import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyproductionreportprintComponent } from './dailyproductionreportprint.component';

describe('DailyproductionreportprintComponent', () => {
  let component: DailyproductionreportprintComponent;
  let fixture: ComponentFixture<DailyproductionreportprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyproductionreportprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyproductionreportprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
