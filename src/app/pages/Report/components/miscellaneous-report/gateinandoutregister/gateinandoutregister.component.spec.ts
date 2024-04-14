import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateinandoutregisterComponent } from './gateinandoutregister.component';

describe('GateinandoutregisterComponent', () => {
  let component: GateinandoutregisterComponent;
  let fixture: ComponentFixture<GateinandoutregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateinandoutregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateinandoutregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
