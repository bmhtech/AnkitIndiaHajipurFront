import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverprintpopupmisComponent } from './driverprintpopupmis.component';

describe('DriverprintpopupmisComponent', () => {
  let component: DriverprintpopupmisComponent;
  let fixture: ComponentFixture<DriverprintpopupmisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverprintpopupmisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverprintpopupmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
