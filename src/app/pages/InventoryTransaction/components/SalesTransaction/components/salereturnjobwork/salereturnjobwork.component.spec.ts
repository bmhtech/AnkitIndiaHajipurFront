import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalereturnjobworkComponent } from './salereturnjobwork.component';

describe('SalereturnjobworkComponent', () => {
  let component: SalereturnjobworkComponent;
  let fixture: ComponentFixture<SalereturnjobworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalereturnjobworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalereturnjobworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
