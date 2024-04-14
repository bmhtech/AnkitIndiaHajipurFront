import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TDSMasterComponent } from './tdsmaster.component';

describe('TDSMasterComponent', () => {
  let component: TDSMasterComponent;
  let fixture: ComponentFixture<TDSMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TDSMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TDSMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
