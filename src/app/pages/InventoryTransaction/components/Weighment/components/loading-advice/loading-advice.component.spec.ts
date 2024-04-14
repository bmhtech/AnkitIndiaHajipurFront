import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAdviceComponent } from './loading-advice.component';

describe('LoadingAdviceComponent', () => {
  let component: LoadingAdviceComponent;
  let fixture: ComponentFixture<LoadingAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
