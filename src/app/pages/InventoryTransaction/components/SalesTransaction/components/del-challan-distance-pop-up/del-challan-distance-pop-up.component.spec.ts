import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelChallanDistancePopUpComponent } from './del-challan-distance-pop-up.component';

describe('DelChallanDistancePopUpComponent', () => {
  let component: DelChallanDistancePopUpComponent;
  let fixture: ComponentFixture<DelChallanDistancePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelChallanDistancePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelChallanDistancePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
