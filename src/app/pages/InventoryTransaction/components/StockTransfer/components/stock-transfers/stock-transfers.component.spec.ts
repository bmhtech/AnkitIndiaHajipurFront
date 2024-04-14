import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransfersComponent } from './stock-transfers.component';

describe('StockTransfersComponent', () => {
  let component: StockTransfersComponent;
  let fixture: ComponentFixture<StockTransfersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTransfersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
