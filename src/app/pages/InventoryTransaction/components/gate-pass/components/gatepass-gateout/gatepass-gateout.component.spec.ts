import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepassGateoutComponent } from './gatepass-gateout.component';

describe('GatepassGateoutComponent', () => {
  let component: GatepassGateoutComponent;
  let fixture: ComponentFixture<GatepassGateoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatepassGateoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepassGateoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
