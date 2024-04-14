import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuoPopUpModalComponent } from './sales-quo-pop-up-modal.component';

describe('SalesQuoPopUpModalComponent', () => {
  let component: SalesQuoPopUpModalComponent;
  let fixture: ComponentFixture<SalesQuoPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuoPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuoPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
