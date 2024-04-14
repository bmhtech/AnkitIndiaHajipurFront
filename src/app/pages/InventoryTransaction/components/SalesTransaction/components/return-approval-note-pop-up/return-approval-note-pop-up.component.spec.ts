import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnApprovalNotePopUpComponent } from './return-approval-note-pop-up.component';

describe('ReturnApprovalNotePopUpComponent', () => {
  let component: ReturnApprovalNotePopUpComponent;
  let fixture: ComponentFixture<ReturnApprovalNotePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnApprovalNotePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnApprovalNotePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
