import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionpopupComponent } from './requisitionpopup.component';

describe('RequisitionpopupComponent', () => {
  let component: RequisitionpopupComponent;
  let fixture: ComponentFixture<RequisitionpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
