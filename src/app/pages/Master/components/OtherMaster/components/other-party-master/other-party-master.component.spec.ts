import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPartyMasterComponent } from './other-party-master.component';

describe('OtherPartyMasterComponent', () => {
  let component: OtherPartyMasterComponent;
  let fixture: ComponentFixture<OtherPartyMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPartyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPartyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
