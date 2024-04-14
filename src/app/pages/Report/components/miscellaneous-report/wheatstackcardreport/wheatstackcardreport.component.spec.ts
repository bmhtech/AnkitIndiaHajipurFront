import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatstackcardreportComponent } from './wheatstackcardreport.component';

describe('WheatstackcardreportComponent', () => {
  let component: WheatstackcardreportComponent;
  let fixture: ComponentFixture<WheatstackcardreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatstackcardreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatstackcardreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
