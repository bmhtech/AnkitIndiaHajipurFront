import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesorderjobworkpopupComponent } from './salesorderjobworkpopup.component';

describe('SalesorderjobworkpopupComponent', () => {
  let component: SalesorderjobworkpopupComponent;
  let fixture: ComponentFixture<SalesorderjobworkpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesorderjobworkpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesorderjobworkpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
