import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPartnerGroupMasterComponent } from './OtherPartnerGroupMaster.component';

describe('OtherPartnerGroupMasterComponent', () => {
  let component: OtherPartnerGroupMasterComponent;
  let fixture: ComponentFixture<OtherPartnerGroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPartnerGroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPartnerGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
