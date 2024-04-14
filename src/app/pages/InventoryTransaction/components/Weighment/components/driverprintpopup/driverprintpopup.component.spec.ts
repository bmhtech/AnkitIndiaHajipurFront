import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverprintpopupComponent } from './driverprintpopup.component';

describe('DriverprintpopupComponent', () => {
  let component: DriverprintpopupComponent;
  let fixture: ComponentFixture<DriverprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
