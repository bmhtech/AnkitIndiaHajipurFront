import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnApprovalJobworkPopupComponent } from './return-approval-jobwork-popup.component';

describe('ReturnApprovalJobworkPopupComponent', () => {
  let component: ReturnApprovalJobworkPopupComponent;
  let fixture: ComponentFixture<ReturnApprovalJobworkPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnApprovalJobworkPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnApprovalJobworkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
