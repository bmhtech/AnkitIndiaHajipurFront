import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurorderReturnapprovalPopupComponent } from './purorder-returnapproval-popup.component';

describe('PurorderReturnapprovalPopupComponent', () => {
  let component: PurorderReturnapprovalPopupComponent;
  let fixture: ComponentFixture<PurorderReturnapprovalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurorderReturnapprovalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurorderReturnapprovalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
