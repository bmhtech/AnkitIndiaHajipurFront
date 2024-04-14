import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralQualityCheckComponent } from './peripheral-quality-check.component';

describe('PeripheralQualityCheckComponent', () => {
  let component: PeripheralQualityCheckComponent;
  let fixture: ComponentFixture<PeripheralQualityCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeripheralQualityCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralQualityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
