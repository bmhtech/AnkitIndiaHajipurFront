import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterTaxCodeModalComponent } from './item-master-tax-code-modal.component';

describe('ItemMasterTaxCodeModalComponent', () => {
  let component: ItemMasterTaxCodeModalComponent;
  let fixture: ComponentFixture<ItemMasterTaxCodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMasterTaxCodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterTaxCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
