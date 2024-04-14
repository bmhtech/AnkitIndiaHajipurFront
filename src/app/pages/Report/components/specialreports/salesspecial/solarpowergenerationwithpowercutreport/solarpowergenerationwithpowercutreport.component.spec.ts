import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarpowergenerationwithpowercutreportComponent } from './solarpowergenerationwithpowercutreport.component';

describe('SolarpowergenerationwithpowercutreportComponent', () => {
  let component: SolarpowergenerationwithpowercutreportComponent;
  let fixture: ComponentFixture<SolarpowergenerationwithpowercutreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarpowergenerationwithpowercutreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarpowergenerationwithpowercutreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
