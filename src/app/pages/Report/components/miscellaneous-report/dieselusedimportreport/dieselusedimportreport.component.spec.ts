import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselusedimportreportComponent } from './dieselusedimportreport.component';

describe('DieselusedimportreportComponent', () => {
  let component: DieselusedimportreportComponent;
  let fixture: ComponentFixture<DieselusedimportreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselusedimportreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselusedimportreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
