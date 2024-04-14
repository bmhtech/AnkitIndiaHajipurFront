import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { L1SelectionComponent } from './l1-selection.component';

describe('L1SelectionComponent', () => {
  let component: L1SelectionComponent;
  let fixture: ComponentFixture<L1SelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ L1SelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(L1SelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
