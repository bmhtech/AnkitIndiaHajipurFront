import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepassregisterComponent } from './gatepassregister.component';

describe('GatepassregisterComponent', () => {
  let component: GatepassregisterComponent;
  let fixture: ComponentFixture<GatepassregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatepassregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepassregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
