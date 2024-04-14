import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasegrndriverComponent } from './purchasegrndriver.component';

describe('PurchasegrndriverComponent', () => {
  let component: PurchasegrndriverComponent;
  let fixture: ComponentFixture<PurchasegrndriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasegrndriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasegrndriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
