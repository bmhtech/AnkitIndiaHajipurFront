import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAccountComponent } from './control-account.component';

describe('ControlAccountComponent', () => {
  let component: ControlAccountComponent;
  let fixture: ComponentFixture<ControlAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
