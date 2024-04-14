import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherWeighmentComponent } from './other-weighment.component';

describe('OtherWeighmentComponent', () => {
  let component: OtherWeighmentComponent;
  let fixture: ComponentFixture<OtherWeighmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherWeighmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherWeighmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
