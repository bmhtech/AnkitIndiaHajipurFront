import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmodalComponent } from './itemmodal.component';

describe('ItemmodalComponent', () => {
  let component: ItemmodalComponent;
  let fixture: ComponentFixture<ItemmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
