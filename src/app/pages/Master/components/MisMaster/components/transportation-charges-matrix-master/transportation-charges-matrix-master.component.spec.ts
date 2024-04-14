import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationChargesMatrixMasterComponent } from './transportation-charges-matrix-master.component';

describe('TransportationChargesMatrixMasterComponent', () => {
  let component: TransportationChargesMatrixMasterComponent;
  let fixture: ComponentFixture<TransportationChargesMatrixMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationChargesMatrixMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationChargesMatrixMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
