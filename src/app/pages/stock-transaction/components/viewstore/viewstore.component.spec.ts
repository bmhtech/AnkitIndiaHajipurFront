import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstoreComponent } from './viewstore.component';

describe('ViewstoreComponent', () => {
  let component: ViewstoreComponent;
  let fixture: ComponentFixture<ViewstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
