import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTransportComponent } from './purchase-transport.component';

describe('PurchaseTransportComponent', () => {
  let component: PurchaseTransportComponent;
  let fixture: ComponentFixture<PurchaseTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
