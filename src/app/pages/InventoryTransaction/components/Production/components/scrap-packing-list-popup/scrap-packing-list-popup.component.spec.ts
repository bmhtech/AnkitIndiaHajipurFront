import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapPackingListPopupComponent } from './scrap-packing-list-popup.component';

describe('ScrapPackingListPopupComponent', () => {
  let component: ScrapPackingListPopupComponent;
  let fixture: ComponentFixture<ScrapPackingListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapPackingListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapPackingListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
