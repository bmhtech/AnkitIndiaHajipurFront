import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiunloadadvicepopupreviseComponent } from './multiunloadadvicepopuprevise.component';

describe('MultiunloadadvicepopupreviseComponent', () => {
  let component: MultiunloadadvicepopupreviseComponent;
  let fixture: ComponentFixture<MultiunloadadvicepopupreviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiunloadadvicepopupreviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiunloadadvicepopupreviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
