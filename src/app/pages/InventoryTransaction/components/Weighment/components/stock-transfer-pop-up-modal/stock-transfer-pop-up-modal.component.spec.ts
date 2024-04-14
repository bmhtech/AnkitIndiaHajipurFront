import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferPopUpModalComponent } from './stock-transfer-pop-up-modal.component';

describe('StockTransferPopUpModalComponent', () => {
  let component: StockTransferPopUpModalComponent;
  let fixture: ComponentFixture<StockTransferPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransferPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransferPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
