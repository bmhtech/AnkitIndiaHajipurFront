import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailystockfinishgoodpopupComponent } from './dailystockfinishgoodpopup.component';

describe('DailystockfinishgoodpopupComponent', () => {
  let component: DailystockfinishgoodpopupComponent;
  let fixture: ComponentFixture<DailystockfinishgoodpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailystockfinishgoodpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailystockfinishgoodpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
