import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighmentChargesMasterComponent } from './weighment-charges-master.component';

describe('WeighmentChargesMasterComponent', () => {
  let component: WeighmentChargesMasterComponent;
  let fixture: ComponentFixture<WeighmentChargesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighmentChargesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighmentChargesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
