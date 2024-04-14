import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsmastercategoryComponent } from './accountsmastercategory.component';

describe('AccountsmastercategoryComponent', () => {
  let component: AccountsmastercategoryComponent;
  let fixture: ComponentFixture<AccountsmastercategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsmastercategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsmastercategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
