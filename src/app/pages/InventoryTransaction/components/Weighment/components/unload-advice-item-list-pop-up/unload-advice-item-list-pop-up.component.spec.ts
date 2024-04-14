import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadAdviceItemListPopUpComponent } from './unload-advice-item-list-pop-up.component';

describe('UnloadAdviceItemListPopUpComponent', () => {
  let component: UnloadAdviceItemListPopUpComponent;
  let fixture: ComponentFixture<UnloadAdviceItemListPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadAdviceItemListPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadAdviceItemListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
