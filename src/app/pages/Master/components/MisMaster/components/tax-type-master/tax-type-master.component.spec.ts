import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTypeMasterComponent } from './tax-type-master.component';

describe('TaxTypeMasterComponent', () => {
  let component: TaxTypeMasterComponent;
  let fixture: ComponentFixture<TaxTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
