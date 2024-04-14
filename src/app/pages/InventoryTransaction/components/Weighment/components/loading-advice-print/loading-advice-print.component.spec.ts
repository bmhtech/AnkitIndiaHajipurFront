import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAdvicePrintComponent } from './loading-advice-print.component';

describe('LoadingAdvicePrintComponent', () => {
  let component: LoadingAdvicePrintComponent;
  let fixture: ComponentFixture<LoadingAdvicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAdvicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAdvicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
