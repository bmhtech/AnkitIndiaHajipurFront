import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAccountLedgerMasterComponent } from './general-account-ledger-master.component';

describe('GeneralAccountLedgerMasterComponent', () => {
  let component: GeneralAccountLedgerMasterComponent;
  let fixture: ComponentFixture<GeneralAccountLedgerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAccountLedgerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAccountLedgerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
