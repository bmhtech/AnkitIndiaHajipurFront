import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackMaintainComponent } from './stack-maintain.component';

describe('StackMaintainComponent', () => {
  let component: StackMaintainComponent;
  let fixture: ComponentFixture<StackMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
