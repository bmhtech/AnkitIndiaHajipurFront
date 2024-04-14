import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarpowergenerationwithpowercutComponent } from './solarpowergenerationwithpowercut.component';

describe('SolarpowergenerationwithpowercutComponent', () => {
  let component: SolarpowergenerationwithpowercutComponent;
  let fixture: ComponentFixture<SolarpowergenerationwithpowercutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarpowergenerationwithpowercutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarpowergenerationwithpowercutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
