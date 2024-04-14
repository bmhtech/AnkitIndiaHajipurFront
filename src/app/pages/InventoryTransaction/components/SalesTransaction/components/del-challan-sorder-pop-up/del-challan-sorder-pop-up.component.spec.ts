import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelChallanSOrderPopUpComponent } from './del-challan-sorder-pop-up.component';

describe('DelChallanSOrderPopUpComponent', () => {
  let component: DelChallanSOrderPopUpComponent;
  let fixture: ComponentFixture<DelChallanSOrderPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelChallanSOrderPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelChallanSOrderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
