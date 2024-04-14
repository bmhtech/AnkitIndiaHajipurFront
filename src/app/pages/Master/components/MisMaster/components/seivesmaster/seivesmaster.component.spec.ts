import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeivesmasterComponent } from './seivesmaster.component';

describe('SeivesmasterComponent', () => {
  let component: SeivesmasterComponent;
  let fixture: ComponentFixture<SeivesmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeivesmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeivesmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
