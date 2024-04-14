import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnApprovalNotePopUpComponent } from './sales-return-approval-note-pop-up.component';

describe('SalesReturnApprovalNotePopUpComponent', () => {
  let component: SalesReturnApprovalNotePopUpComponent;
  let fixture: ComponentFixture<SalesReturnApprovalNotePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnApprovalNotePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnApprovalNotePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
