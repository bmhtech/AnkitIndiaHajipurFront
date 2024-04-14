import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutpopupmodalComponent } from './logoutpopupmodal.component';

describe('LogoutpopupmodalComponent', () => {
  let component: LogoutpopupmodalComponent;
  let fixture: ComponentFixture<LogoutpopupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutpopupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutpopupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
