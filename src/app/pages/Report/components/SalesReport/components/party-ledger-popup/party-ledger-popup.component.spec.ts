import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyLedgerPopupComponent } from './party-ledger-popup.component';

describe('PartyLedgerPopupComponent', () => {
  let component: PartyLedgerPopupComponent;
  let fixture: ComponentFixture<PartyLedgerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyLedgerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyLedgerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
