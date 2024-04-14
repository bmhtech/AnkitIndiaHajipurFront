import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdviceJobworkComponent } from './unload-advice-jobwork.component';

describe('UnloadAdviceJobworkComponent', () => {
  let component: UnloadAdviceJobworkComponent;
  let fixture: ComponentFixture<UnloadAdviceJobworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdviceJobworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdviceJobworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
