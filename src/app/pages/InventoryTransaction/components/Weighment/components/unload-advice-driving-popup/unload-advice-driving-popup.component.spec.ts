import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdviceDrivingPopupComponent } from './unload-advice-driving-popup.component';

describe('UnloadAdviceDrivingPopupComponent', () => {
  let component: UnloadAdviceDrivingPopupComponent;
  let fixture: ComponentFixture<UnloadAdviceDrivingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdviceDrivingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdviceDrivingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
