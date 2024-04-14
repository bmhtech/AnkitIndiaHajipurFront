import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkitemallocationComponent } from './jobworkitemallocation.component';

describe('JobworkitemallocationComponent', () => {
  let component: JobworkitemallocationComponent;
  let fixture: ComponentFixture<JobworkitemallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobworkitemallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkitemallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
