import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferGrnComponent } from './stock-transfer-grn.component';

describe('StockTransferGrnComponent', () => {
  let component: StockTransferGrnComponent;
  let fixture: ComponentFixture<StockTransferGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
