import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnoteEwaybillCancelComponent } from './creditnote-ewaybill-cancel.component';

describe('CreditnoteEwaybillCancelComponent', () => {
  let component: CreditnoteEwaybillCancelComponent;
  let fixture: ComponentFixture<CreditnoteEwaybillCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditnoteEwaybillCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditnoteEwaybillCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
