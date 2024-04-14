import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEnqCusPopUpComponent } from './sales-enq-cus-pop-up.component';

describe('SalesEnqCusPopUpComponent', () => {
  let component: SalesEnqCusPopUpComponent;
  let fixture: ComponentFixture<SalesEnqCusPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEnqCusPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEnqCusPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
