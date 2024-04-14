import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoborderComponent } from './joborder.component';

describe('JoborderComponent', () => {
  let component: JoborderComponent;
  let fixture: ComponentFixture<JoborderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoborderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoborderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
