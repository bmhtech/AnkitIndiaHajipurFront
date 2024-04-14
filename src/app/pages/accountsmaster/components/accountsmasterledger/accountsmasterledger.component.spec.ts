import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsmasterledgerComponent } from './accountsmasterledger.component';

describe('AccountsmasterledgerComponent', () => {
  let component: AccountsmasterledgerComponent;
  let fixture: ComponentFixture<AccountsmasterledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsmasterledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsmasterledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
