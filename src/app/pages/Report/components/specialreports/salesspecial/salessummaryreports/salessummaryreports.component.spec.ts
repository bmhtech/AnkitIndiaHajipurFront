import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalessummaryreportsComponent } from './salessummaryreports.component';

describe('SalessummaryreportsComponent', () => {
  let component: SalessummaryreportsComponent;
  let fixture: ComponentFixture<SalessummaryreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalessummaryreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalessummaryreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
