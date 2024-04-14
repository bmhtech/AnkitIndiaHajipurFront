import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesordermiscleaneousreportComponent } from './salesordermiscleaneousreport.component';

describe('SalesordermiscleaneousreportComponent', () => {
  let component: SalesordermiscleaneousreportComponent;
  let fixture: ComponentFixture<SalesordermiscleaneousreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesordermiscleaneousreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesordermiscleaneousreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
