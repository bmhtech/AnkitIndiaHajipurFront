import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MillbreakdownreportComponent } from './millbreakdownreport.component';

describe('MillbreakdownreportComponent', () => {
  let component: MillbreakdownreportComponent;
  let fixture: ComponentFixture<MillbreakdownreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MillbreakdownreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MillbreakdownreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
