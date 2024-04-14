import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectiveSalesOrderComponent } from './effective-sales-order.component';

describe('EffectiveSalesOrderComponent', () => {
  let component: EffectiveSalesOrderComponent;
  let fixture: ComponentFixture<EffectiveSalesOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectiveSalesOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectiveSalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
