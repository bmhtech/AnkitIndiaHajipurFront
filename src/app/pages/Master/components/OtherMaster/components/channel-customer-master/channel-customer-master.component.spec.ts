import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCustomerMasterComponent } from './channel-customer-master.component';

describe('ChannelCustomerMasterComponent', () => {
  let component: ChannelCustomerMasterComponent;
  let fixture: ComponentFixture<ChannelCustomerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCustomerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
