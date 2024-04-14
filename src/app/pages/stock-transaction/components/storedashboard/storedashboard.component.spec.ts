import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredashboardComponent } from './storedashboard.component';

describe('StoredashboardComponent', () => {
  let component: StoredashboardComponent;
  let fixture: ComponentFixture<StoredashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
