import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleReturnApprovalPopupComponent } from './multiple-return-approval-popup.component';

describe('MultipleReturnApprovalPopupComponent', () => {
  let component: MultipleReturnApprovalPopupComponent;
  let fixture: ComponentFixture<MultipleReturnApprovalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleReturnApprovalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleReturnApprovalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
