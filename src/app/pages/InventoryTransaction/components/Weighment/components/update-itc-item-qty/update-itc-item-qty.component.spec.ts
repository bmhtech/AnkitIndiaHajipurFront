import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItcItemQtyComponent } from './update-itc-item-qty.component';

describe('UpdateItcItemQtyComponent', () => {
  let component: UpdateItcItemQtyComponent;
  let fixture: ComponentFixture<UpdateItcItemQtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateItcItemQtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateItcItemQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
