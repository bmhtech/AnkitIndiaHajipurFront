import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWeighmentComponent } from './loading-weighment.component';

describe('LoadingWeighmentComponent', () => {
  let component: LoadingWeighmentComponent;
  let fixture: ComponentFixture<LoadingWeighmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingWeighmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingWeighmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
