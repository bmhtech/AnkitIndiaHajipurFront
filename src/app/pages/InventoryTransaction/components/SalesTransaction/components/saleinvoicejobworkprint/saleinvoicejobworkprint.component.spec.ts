import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleinvoicejobworkprintComponent } from './saleinvoicejobworkprint.component';

describe('SaleinvoicejobworkprintComponent', () => {
  let component: SaleinvoicejobworkprintComponent;
  let fixture: ComponentFixture<SaleinvoicejobworkprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleinvoicejobworkprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleinvoicejobworkprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
