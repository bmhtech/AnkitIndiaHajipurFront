import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingporeportComponent } from './pendingporeport.component';

describe('PendingporeportComponent', () => {
  let component: PendingporeportComponent;
  let fixture: ComponentFixture<PendingporeportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingporeportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingporeportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
