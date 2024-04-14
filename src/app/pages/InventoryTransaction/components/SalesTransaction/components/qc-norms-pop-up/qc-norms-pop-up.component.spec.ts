import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcNormsPopUpComponent } from './qc-norms-pop-up.component';

describe('QcNormsPopUpComponent', () => {
  let component: QcNormsPopUpComponent;
  let fixture: ComponentFixture<QcNormsPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcNormsPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcNormsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
