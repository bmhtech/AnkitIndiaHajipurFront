import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnNoteComponent } from './sales-return-note.component';

describe('SalesReturnNoteComponent', () => {
  let component: SalesReturnNoteComponent;
  let fixture: ComponentFixture<SalesReturnNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
