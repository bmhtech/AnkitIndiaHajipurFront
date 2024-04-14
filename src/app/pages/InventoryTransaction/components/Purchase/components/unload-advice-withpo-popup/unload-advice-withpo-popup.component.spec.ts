import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdviceWithpoPopupComponent } from './unload-advice-withpo-popup.component';

describe('UnloadAdviceWithpoPopupComponent', () => {
  let component: UnloadAdviceWithpoPopupComponent;
  let fixture: ComponentFixture<UnloadAdviceWithpoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdviceWithpoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdviceWithpoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
