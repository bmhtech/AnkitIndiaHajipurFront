import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenMasterComponent } from './screen-master.component';

describe('ScreenMasterComponent', () => {
  let component: ScreenMasterComponent;
  let fixture: ComponentFixture<ScreenMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
