import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGroupMasterComponent } from './ItemGroupMaster.component';

describe('ItemGroupMasterComponent', () => {
  let component: ItemGroupMasterComponent;
  let fixture: ComponentFixture<ItemGroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
