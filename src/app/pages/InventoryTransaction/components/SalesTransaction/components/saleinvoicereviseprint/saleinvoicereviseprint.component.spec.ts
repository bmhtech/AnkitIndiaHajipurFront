import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleinvoicereviseprintComponent } from './saleinvoicereviseprint.component';

describe('SaleinvoicereviseprintComponent', () => {
  let component: SaleinvoicereviseprintComponent;
  let fixture: ComponentFixture<SaleinvoicereviseprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleinvoicereviseprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleinvoicereviseprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
