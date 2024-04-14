import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurReturnNoteComponent } from './pur-return-note.component';

describe('PurReturnNoteComponent', () => {
  let component: PurReturnNoteComponent;
  let fixture: ComponentFixture<PurReturnNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurReturnNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurReturnNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
