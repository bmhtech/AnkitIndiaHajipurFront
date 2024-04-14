import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseMasterComponent } from './ware-house-master.component';

describe('WareHouseMasterComponent', () => {
  let component: WareHouseMasterComponent;
  let fixture: ComponentFixture<WareHouseMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareHouseMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareHouseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
