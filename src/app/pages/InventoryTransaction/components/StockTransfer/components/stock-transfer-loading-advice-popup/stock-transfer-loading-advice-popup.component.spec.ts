import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferLoadingAdvicePopupComponent } from './stock-transfer-loading-advice-popup.component';

describe('StockTransferLoadingAdvicePopupComponent', () => {
  let component: StockTransferLoadingAdvicePopupComponent;
  let fixture: ComponentFixture<StockTransferLoadingAdvicePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferLoadingAdvicePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferLoadingAdvicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
