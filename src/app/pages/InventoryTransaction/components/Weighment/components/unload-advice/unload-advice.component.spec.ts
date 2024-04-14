import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdviceComponent } from './unload-advice.component';

describe('UnloadAdviceComponent', () => {
  let component: UnloadAdviceComponent;
  let fixture: ComponentFixture<UnloadAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
