import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseToWarehouseStoreTransferComponent } from './warehouse-to-warehouse-store-transfer.component';

describe('WarehouseToWarehouseStoreTransferComponent', () => {
  let component: WarehouseToWarehouseStoreTransferComponent;
  let fixture: ComponentFixture<WarehouseToWarehouseStoreTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseToWarehouseStoreTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseToWarehouseStoreTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
