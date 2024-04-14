import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Itemmodal1Component } from './itemmodal1.component';

describe('Itemmodal1Component', () => {
  let component: Itemmodal1Component;
  let fixture: ComponentFixture<Itemmodal1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Itemmodal1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Itemmodal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
