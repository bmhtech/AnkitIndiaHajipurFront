import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiunloadadvicepopupComponent } from './multiunloadadvicepopup.component';

describe('MultiunloadadvicepopupComponent', () => {
  let component: MultiunloadadvicepopupComponent;
  let fixture: ComponentFixture<MultiunloadadvicepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiunloadadvicepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiunloadadvicepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
