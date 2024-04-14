import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuoTaxModalComponent } from './sales-quo-tax-modal.component';

describe('SalesQuoTaxModalComponent', () => {
  let component: SalesQuoTaxModalComponent;
  let fixture: ComponentFixture<SalesQuoTaxModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuoTaxModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuoTaxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
