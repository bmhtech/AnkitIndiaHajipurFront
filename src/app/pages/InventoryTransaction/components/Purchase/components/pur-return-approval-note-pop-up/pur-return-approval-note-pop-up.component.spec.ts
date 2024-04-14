import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurReturnApprovalNotePopUpComponent } from './pur-return-approval-note-pop-up.component';

describe('PurReturnApprovalNotePopUpComponent', () => {
  let component: PurReturnApprovalNotePopUpComponent;
  let fixture: ComponentFixture<PurReturnApprovalNotePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurReturnApprovalNotePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurReturnApprovalNotePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
