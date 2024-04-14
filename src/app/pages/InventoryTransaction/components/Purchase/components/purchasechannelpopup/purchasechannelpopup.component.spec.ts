import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasechannelpopupComponent } from './purchasechannelpopup.component';

describe('PurchasechannelpopupComponent', () => {
  let component: PurchasechannelpopupComponent;
  let fixture: ComponentFixture<PurchasechannelpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasechannelpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasechannelpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
