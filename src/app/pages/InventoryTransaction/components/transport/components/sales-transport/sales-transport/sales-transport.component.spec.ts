import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTransportComponent } from './sales-transport.component';

describe('SalesTransportComponent', () => {
  let component: SalesTransportComponent;
  let fixture: ComponentFixture<SalesTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
