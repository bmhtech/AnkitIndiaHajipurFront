import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepassGateoutAComponent } from './gatepass-gateout-a.component';

describe('GatepassGateoutAComponent', () => {
  let component: GatepassGateoutAComponent;
  let fixture: ComponentFixture<GatepassGateoutAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatepassGateoutAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepassGateoutAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
