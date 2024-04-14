import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyitemwiseloadingreportComponent } from './dailyitemwiseloadingreport.component';

describe('DailyitemwiseloadingreportComponent', () => {
  let component: DailyitemwiseloadingreportComponent;
  let fixture: ComponentFixture<DailyitemwiseloadingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyitemwiseloadingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyitemwiseloadingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
