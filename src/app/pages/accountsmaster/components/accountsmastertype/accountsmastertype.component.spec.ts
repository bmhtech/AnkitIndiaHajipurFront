import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsmastertypeComponent } from './accountsmastertype.component';

describe('AccountsmastertypeComponent', () => {
  let component: AccountsmastertypeComponent;
  let fixture: ComponentFixture<AccountsmastertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsmastertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsmastertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
