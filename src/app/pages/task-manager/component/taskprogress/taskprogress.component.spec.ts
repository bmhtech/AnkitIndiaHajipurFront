import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskprogressComponent } from './taskprogress.component';

describe('TaskprogressComponent', () => {
  let component: TaskprogressComponent;
  let fixture: ComponentFixture<TaskprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
