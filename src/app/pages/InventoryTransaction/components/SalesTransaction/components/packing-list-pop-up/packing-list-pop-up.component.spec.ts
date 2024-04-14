import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingListPopUpComponent } from './packing-list-pop-up.component';

describe('PackingListPopUpComponent', () => {
  let component: PackingListPopUpComponent;
  let fixture: ComponentFixture<PackingListPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingListPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
