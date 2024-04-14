import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdynamicComponent } from './navdynamic.component';

describe('NavdynamicComponent', () => {
  let component: NavdynamicComponent;
  let fixture: ComponentFixture<NavdynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavdynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavdynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
