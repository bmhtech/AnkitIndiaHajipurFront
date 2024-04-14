import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubgroupMasterComponent } from './account-subgroup-master.component';

describe('AccountSubgroupMasterComponent', () => {
  let component: AccountSubgroupMasterComponent;
  let fixture: ComponentFixture<AccountSubgroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubgroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubgroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
