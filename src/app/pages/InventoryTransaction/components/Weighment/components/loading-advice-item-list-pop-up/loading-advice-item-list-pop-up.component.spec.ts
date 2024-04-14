import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAdviceItemListPopUpComponent } from './loading-advice-item-list-pop-up.component';

describe('LoadingAdviceItemListPopUpComponent', () => {
  let component: LoadingAdviceItemListPopUpComponent;
  let fixture: ComponentFixture<LoadingAdviceItemListPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingAdviceItemListPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAdviceItemListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
