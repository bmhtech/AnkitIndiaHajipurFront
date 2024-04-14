import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdvicePopUpComponent } from './unload-advice-pop-up.component';

describe('UnloadAdvicePopUpComponent', () => {
  let component: UnloadAdvicePopUpComponent;
  let fixture: ComponentFixture<UnloadAdvicePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdvicePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdvicePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
