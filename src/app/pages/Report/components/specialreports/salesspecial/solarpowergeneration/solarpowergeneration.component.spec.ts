import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarpowergenerationComponent } from './solarpowergeneration.component';

describe('SolarpowergenerationComponent', () => {
  let component: SolarpowergenerationComponent;
  let fixture: ComponentFixture<SolarpowergenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarpowergenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarpowergenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
