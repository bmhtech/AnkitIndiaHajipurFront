import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcategorymasterComponent } from './ItemCategoryMaster.component';

describe('ItemcategorymasterComponent', () => {
  let component: ItemcategorymasterComponent;
  let fixture: ComponentFixture<ItemcategorymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemcategorymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemcategorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
