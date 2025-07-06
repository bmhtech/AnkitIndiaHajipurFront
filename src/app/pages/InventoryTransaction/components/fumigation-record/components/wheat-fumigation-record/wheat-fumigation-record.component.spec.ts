import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatFumigationRecordComponent } from './wheat-fumigation-record.component';

describe('WheatFumigationRecordComponent', () => {
  let component: WheatFumigationRecordComponent;
  let fixture: ComponentFixture<WheatFumigationRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatFumigationRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatFumigationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
