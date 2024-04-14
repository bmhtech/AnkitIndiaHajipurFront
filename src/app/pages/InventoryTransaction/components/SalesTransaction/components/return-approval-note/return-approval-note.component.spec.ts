import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnApprovalNoteComponent } from './return-approval-note.component';

describe('ReturnApprovalNoteComponent', () => {
  let component: ReturnApprovalNoteComponent;
  let fixture: ComponentFixture<ReturnApprovalNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnApprovalNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnApprovalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
