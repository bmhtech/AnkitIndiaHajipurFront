import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportjvpostingComponent } from './transportjvposting.component';

describe('TransportjvpostingComponent', () => {
  let component: TransportjvpostingComponent;
  let fixture: ComponentFixture<TransportjvpostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportjvpostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportjvpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
