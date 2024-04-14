import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderproformaprintComponent } from './saleorderproformaprint.component';

describe('SaleorderproformaprintComponent', () => {
  let component: SaleorderproformaprintComponent;
  let fixture: ComponentFixture<SaleorderproformaprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleorderproformaprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleorderproformaprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
