import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownmasterComponent } from './godownmaster.component';

describe('GodownmasterComponent', () => {
  let component: GodownmasterComponent;
  let fixture: ComponentFixture<GodownmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GodownmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GodownmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
