import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatepassChecklistComponent } from './gatepass-checklist.component';

describe('GatepassChecklistComponent', () => {
  let component: GatepassChecklistComponent;
  let fixture: ComponentFixture<GatepassChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatepassChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatepassChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
