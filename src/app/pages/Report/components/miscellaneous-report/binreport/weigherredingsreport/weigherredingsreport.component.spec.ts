import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeigherredingsreportComponent } from './weigherredingsreport.component';

describe('WeigherredingsreportComponent', () => {
  let component: WeigherredingsreportComponent;
  let fixture: ComponentFixture<WeigherredingsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeigherredingsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeigherredingsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
