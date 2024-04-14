import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdviceWithoutpoPopupComponent } from './unload-advice-withoutpo-popup.component';

describe('UnloadAdviceWithoutpoPopupComponent', () => {
  let component: UnloadAdviceWithoutpoPopupComponent;
  let fixture: ComponentFixture<UnloadAdviceWithoutpoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdviceWithoutpoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdviceWithoutpoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
