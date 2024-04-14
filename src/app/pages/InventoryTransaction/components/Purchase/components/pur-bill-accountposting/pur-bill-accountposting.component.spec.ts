import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurBillAccountpostingComponent } from './pur-bill-accountposting.component';

describe('PurBillAccountpostingComponent', () => {
  let component: PurBillAccountpostingComponent;
  let fixture: ComponentFixture<PurBillAccountpostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurBillAccountpostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurBillAccountpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
