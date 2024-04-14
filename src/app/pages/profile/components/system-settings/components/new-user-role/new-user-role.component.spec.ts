import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserRoleComponent } from './new-user-role.component';

describe('NewUserRoleComponent', () => {
  let component: NewUserRoleComponent;
  let fixture: ComponentFixture<NewUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
