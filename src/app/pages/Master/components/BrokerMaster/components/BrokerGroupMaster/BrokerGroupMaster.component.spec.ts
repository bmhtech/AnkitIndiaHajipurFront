import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerGroupMasterComponent } from './BrokerGroupMaster.component';

describe('BrokerGroupMasterComponent', () => {
  let component: BrokerGroupMasterComponent;
  let fixture: ComponentFixture<BrokerGroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerGroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
