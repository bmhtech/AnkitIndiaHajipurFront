import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsmastergroupComponent } from './accountsmastergroup.component';

describe('AccountsmastergroupComponent', () => {
  let component: AccountsmastergroupComponent;
  let fixture: ComponentFixture<AccountsmastergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsmastergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsmastergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
