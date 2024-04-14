import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighmentterminatepopupComponent } from './weighmentterminatepopup.component';

describe('WeighmentterminatepopupComponent', () => {
  let component: WeighmentterminatepopupComponent;
  let fixture: ComponentFixture<WeighmentterminatepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighmentterminatepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighmentterminatepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
