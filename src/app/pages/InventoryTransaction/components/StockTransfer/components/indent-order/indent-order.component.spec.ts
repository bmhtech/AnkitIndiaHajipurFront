import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentOrderComponent } from './indent-order.component';

describe('IndentOrderComponent', () => {
  let component: IndentOrderComponent;
  let fixture: ComponentFixture<IndentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
