import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurReturnNotePopUpComponent } from './pur-return-note-pop-up.component';

describe('PurReturnNotePopUpComponent', () => {
  let component: PurReturnNotePopUpComponent;
  let fixture: ComponentFixture<PurReturnNotePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurReturnNotePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurReturnNotePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
