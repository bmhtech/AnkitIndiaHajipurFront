import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurReturnApprovalNoteComponent } from './pur-return-approval-note.component';

describe('PurReturnApprovalNoteComponent', () => {
  let component: PurReturnApprovalNoteComponent;
  let fixture: ComponentFixture<PurReturnApprovalNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurReturnApprovalNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurReturnApprovalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
