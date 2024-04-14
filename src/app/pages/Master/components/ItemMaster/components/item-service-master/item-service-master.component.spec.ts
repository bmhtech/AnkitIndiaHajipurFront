import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemServiceMasterComponent } from './item-service-master.component';

describe('ItemServiceMasterComponent', () => {
  let component: ItemServiceMasterComponent;
  let fixture: ComponentFixture<ItemServiceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemServiceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemServiceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
