import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceNormsMasterComponent } from './acceptance-norms-master.component';

describe('AcceptanceNormsMasterComponent', () => {
  let component: AcceptanceNormsMasterComponent;
  let fixture: ComponentFixture<AcceptanceNormsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceNormsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceNormsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
