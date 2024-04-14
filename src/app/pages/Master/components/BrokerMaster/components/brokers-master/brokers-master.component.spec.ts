import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersMasterComponent } from './brokers-master.component';

describe('BrokersMasterComponent', () => {
  let component: BrokersMasterComponent;
  let fixture: ComponentFixture<BrokersMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokersMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokersMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
