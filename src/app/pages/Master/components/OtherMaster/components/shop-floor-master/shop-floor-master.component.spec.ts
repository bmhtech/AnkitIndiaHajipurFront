import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFloorMasterComponent } from './shop-floor-master.component';

describe('ShopFloorMasterComponent', () => {
  let component: ShopFloorMasterComponent;
  let fixture: ComponentFixture<ShopFloorMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopFloorMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopFloorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
