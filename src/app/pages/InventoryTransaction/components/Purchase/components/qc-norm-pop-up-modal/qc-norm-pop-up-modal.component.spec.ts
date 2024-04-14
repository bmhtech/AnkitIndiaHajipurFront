import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QcNormPopUpModalComponent } from './qc-norm-pop-up-modal.component';

describe('QcNormPopUpModalComponent', () => {
  let component: QcNormPopUpModalComponent;
  let fixture: ComponentFixture<QcNormPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QcNormPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QcNormPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
