import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTransactionSpecialComponent } from './production-transaction-special.component';

describe('ProductionTransactionSpecialComponent', () => {
  let component: ProductionTransactionSpecialComponent;
  let fixture: ComponentFixture<ProductionTransactionSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionTransactionSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionTransactionSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
