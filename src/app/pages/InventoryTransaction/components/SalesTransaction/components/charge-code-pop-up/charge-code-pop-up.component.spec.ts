import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCodePopUpComponent } from './charge-code-pop-up.component';

describe('ChargeCodePopUpComponent', () => {
  let component: ChargeCodePopUpComponent;
  let fixture: ComponentFixture<ChargeCodePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeCodePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeCodePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
