import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentOrderPopUpModalComponent } from './indent-order-pop-up-modal.component';

describe('IndentOrderPopUpModalComponent', () => {
  let component: IndentOrderPopUpModalComponent;
  let fixture: ComponentFixture<IndentOrderPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentOrderPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentOrderPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
