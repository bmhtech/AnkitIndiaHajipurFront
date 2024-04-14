import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatstackcardreportpopupComponent } from './wheatstackcardreportpopup.component';

describe('WheatstackcardreportpopupComponent', () => {
  let component: WheatstackcardreportpopupComponent;
  let fixture: ComponentFixture<WheatstackcardreportpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatstackcardreportpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatstackcardreportpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
