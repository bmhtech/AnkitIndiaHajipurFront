import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailystockfinishgoodComponent } from './dailystockfinishgood.component';

describe('DailystockfinishgoodComponent', () => {
  let component: DailystockfinishgoodComponent;
  let fixture: ComponentFixture<DailystockfinishgoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailystockfinishgoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailystockfinishgoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
