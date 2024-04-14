import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Salesreportsorting2Component } from './salesreportsorting2.component';

describe('Salesreportsorting2Component', () => {
  let component: Salesreportsorting2Component;
  let fixture: ComponentFixture<Salesreportsorting2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Salesreportsorting2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Salesreportsorting2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
