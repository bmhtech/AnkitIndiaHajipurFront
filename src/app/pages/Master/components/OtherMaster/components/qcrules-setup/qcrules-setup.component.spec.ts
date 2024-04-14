import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QCRulesSetupComponent } from './qcrules-setup.component';

describe('QCRulesSetupComponent', () => {
  let component: QCRulesSetupComponent;
  let fixture: ComponentFixture<QCRulesSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QCRulesSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QCRulesSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
