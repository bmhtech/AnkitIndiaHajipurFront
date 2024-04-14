import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputItemPopupComponent } from './input-item-popup.component';

describe('InputItemPopupComponent', () => {
  let component: InputItemPopupComponent;
  let fixture: ComponentFixture<InputItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
