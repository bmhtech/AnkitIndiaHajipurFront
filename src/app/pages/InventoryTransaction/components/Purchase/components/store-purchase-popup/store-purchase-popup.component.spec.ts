import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePurchasePopupComponent } from './store-purchase-popup.component';

describe('StorePurchasePopupComponent', () => {
  let component: StorePurchasePopupComponent;
  let fixture: ComponentFixture<StorePurchasePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePurchasePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePurchasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
