import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxModalComponent } from './tax-modal.component';

describe('TaxModalComponent', () => {
  let component: TaxModalComponent;
  let fixture: ComponentFixture<TaxModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
