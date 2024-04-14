import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnregisterreportpopupComponent } from './grnregisterreportpopup.component';

describe('GrnregisterreportpopupComponent', () => {
  let component: GrnregisterreportpopupComponent;
  let fixture: ComponentFixture<GrnregisterreportpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnregisterreportpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnregisterreportpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
