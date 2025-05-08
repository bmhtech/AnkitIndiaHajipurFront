import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGatepassComponent } from './update-gatepass.component';

describe('UpdateGatepassComponent', () => {
  let component: UpdateGatepassComponent;
  let fixture: ComponentFixture<UpdateGatepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGatepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
