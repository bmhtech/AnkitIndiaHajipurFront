import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnNotePopUpComponent } from './sales-return-note-pop-up.component';

describe('SalesReturnNotePopUpComponent', () => {
  let component: SalesReturnNotePopUpComponent;
  let fixture: ComponentFixture<SalesReturnNotePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnNotePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnNotePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
