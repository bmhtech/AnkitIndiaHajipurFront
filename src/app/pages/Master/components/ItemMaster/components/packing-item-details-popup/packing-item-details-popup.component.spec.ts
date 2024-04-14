import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingItemDetailsPopupComponent } from './packing-item-details-popup.component';

describe('PackingItemDetailsPopupComponent', () => {
  let component: PackingItemDetailsPopupComponent;
  let fixture: ComponentFixture<PackingItemDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingItemDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingItemDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
