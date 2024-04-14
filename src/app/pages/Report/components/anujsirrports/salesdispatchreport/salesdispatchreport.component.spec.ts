import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdispatchreportComponent } from './salesdispatchreport.component';

describe('SalesdispatchreportComponent', () => {
  let component: SalesdispatchreportComponent;
  let fixture: ComponentFixture<SalesdispatchreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesdispatchreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesdispatchreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
