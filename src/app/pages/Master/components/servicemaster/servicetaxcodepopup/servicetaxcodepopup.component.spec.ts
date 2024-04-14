import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetaxcodepopupComponent } from './servicetaxcodepopup.component';

describe('ServicetaxcodepopupComponent', () => {
  let component: ServicetaxcodepopupComponent;
  let fixture: ComponentFixture<ServicetaxcodepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicetaxcodepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicetaxcodepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
