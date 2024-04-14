import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIssueNoteComponent } from './store-issue-note.component';

describe('StoreIssueNoteComponent', () => {
  let component: StoreIssueNoteComponent;
  let fixture: ComponentFixture<StoreIssueNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreIssueNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreIssueNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
