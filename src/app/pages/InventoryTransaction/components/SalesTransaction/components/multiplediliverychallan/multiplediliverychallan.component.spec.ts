import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplediliverychallanComponent } from './multiplediliverychallan.component';

describe('MultiplediliverychallanComponent', () => {
  let component: MultiplediliverychallanComponent;
  let fixture: ComponentFixture<MultiplediliverychallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplediliverychallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplediliverychallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
