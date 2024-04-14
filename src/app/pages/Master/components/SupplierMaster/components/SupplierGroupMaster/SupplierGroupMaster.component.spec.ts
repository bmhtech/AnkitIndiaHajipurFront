import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierGroupmasterComponent } from './SupplierGroupMaster.component';

describe('SupplierGroupmasterComponent', () => {
  let component: SupplierGroupmasterComponent;
  let fixture: ComponentFixture<SupplierGroupmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierGroupmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierGroupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
