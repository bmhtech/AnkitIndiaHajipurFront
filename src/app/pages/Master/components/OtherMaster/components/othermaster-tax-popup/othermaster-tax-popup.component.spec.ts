import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthermasterTaxPopupComponent } from './othermaster-tax-popup.component';

describe('OthermasterTaxPopupComponent', () => {
  let component: OthermasterTaxPopupComponent;
  let fixture: ComponentFixture<OthermasterTaxPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthermasterTaxPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthermasterTaxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
