import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPopUpModalComponent } from './supplier-pop-up-modal.component';

describe('SupplierPopUpModalComponent', () => {
  let component: SupplierPopUpModalComponent;
  let fixture: ComponentFixture<SupplierPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
