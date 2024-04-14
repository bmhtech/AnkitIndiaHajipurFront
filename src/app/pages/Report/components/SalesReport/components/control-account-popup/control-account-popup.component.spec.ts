import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAccountPopupComponent } from './control-account-popup.component';

describe('ControlAccountPopupComponent', () => {
  let component: ControlAccountPopupComponent;
  let fixture: ComponentFixture<ControlAccountPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAccountPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAccountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
