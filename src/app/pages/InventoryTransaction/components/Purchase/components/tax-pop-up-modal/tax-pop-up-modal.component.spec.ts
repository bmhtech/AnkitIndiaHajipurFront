import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPopUpModalComponent } from './tax-pop-up-modal.component';

describe('TaxPopUpModalComponent', () => {
  let component: TaxPopUpModalComponent;
  let fixture: ComponentFixture<TaxPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
