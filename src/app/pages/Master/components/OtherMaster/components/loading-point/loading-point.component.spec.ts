import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPointComponent } from './loading-point.component';

describe('LoadingPointComponent', () => {
  let component: LoadingPointComponent;
  let fixture: ComponentFixture<LoadingPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
