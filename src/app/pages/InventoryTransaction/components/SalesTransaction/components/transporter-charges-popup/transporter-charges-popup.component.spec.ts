import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterChargesPopupComponent } from './transporter-charges-popup.component';

describe('TransporterChargesPopupComponent', () => {
  let component: TransporterChargesPopupComponent;
  let fixture: ComponentFixture<TransporterChargesPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterChargesPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterChargesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
