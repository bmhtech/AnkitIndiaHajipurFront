import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepassGetinComponent } from './gatepass-getin.component';

describe('GatepassGetinComponent', () => {
  let component: GatepassGetinComponent;
  let fixture: ComponentFixture<GatepassGetinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatepassGetinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepassGetinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
