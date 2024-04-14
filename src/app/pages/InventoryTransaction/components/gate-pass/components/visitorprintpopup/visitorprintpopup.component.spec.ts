import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorprintpopupComponent } from './visitorprintpopup.component';

describe('VisitorprintpopupComponent', () => {
  let component: VisitorprintpopupComponent;
  let fixture: ComponentFixture<VisitorprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
