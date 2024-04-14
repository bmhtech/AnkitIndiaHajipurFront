import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopflooraccessComponent } from './shopflooraccess.component';

describe('ShopflooraccessComponent', () => {
  let component: ShopflooraccessComponent;
  let fixture: ComponentFixture<ShopflooraccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopflooraccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopflooraccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
