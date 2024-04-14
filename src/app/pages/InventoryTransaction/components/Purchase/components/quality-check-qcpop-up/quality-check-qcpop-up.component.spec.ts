import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCheckQCPopUpComponent } from './quality-check-qcpop-up.component';

describe('QualityCheckQCPopUpComponent', () => {
  let component: QualityCheckQCPopUpComponent;
  let fixture: ComponentFixture<QualityCheckQCPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityCheckQCPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityCheckQCPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
