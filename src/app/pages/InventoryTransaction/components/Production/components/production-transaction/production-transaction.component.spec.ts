import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTransactionComponent } from './production-transaction.component';

describe('ProductionTransactionComponent', () => {
  let component: ProductionTransactionComponent;
  let fixture: ComponentFixture<ProductionTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
