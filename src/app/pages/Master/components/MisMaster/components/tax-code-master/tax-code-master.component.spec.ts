import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxCodeMasterComponent } from './tax-code-master.component';

describe('TaxCodeMasterComponent', () => {
  let component: TaxCodeMasterComponent;
  let fixture: ComponentFixture<TaxCodeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxCodeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCodeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
