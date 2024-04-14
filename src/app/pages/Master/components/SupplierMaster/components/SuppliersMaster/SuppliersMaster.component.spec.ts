import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersMasterComponent } from './SuppliersMaster.component';

describe('SuppliersMasterComponent', () => {
  let component: SuppliersMasterComponent;
  let fixture: ComponentFixture<SuppliersMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
