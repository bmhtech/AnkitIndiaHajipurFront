import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountledgerpostingComponent } from './accountledgerposting.component';

describe('AccountledgerpostingComponent', () => {
  let component: AccountledgerpostingComponent;
  let fixture: ComponentFixture<AccountledgerpostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountledgerpostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountledgerpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
