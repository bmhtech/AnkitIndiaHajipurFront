import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatunloadingmasterreportComponent } from './wheatunloadingmasterreport.component';

describe('WheatunloadingmasterreportComponent', () => {
  let component: WheatunloadingmasterreportComponent;
  let fixture: ComponentFixture<WheatunloadingmasterreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatunloadingmasterreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatunloadingmasterreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
