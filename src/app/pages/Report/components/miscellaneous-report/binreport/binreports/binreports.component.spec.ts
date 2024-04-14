import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinreportsComponent } from './binreports.component';

describe('BinreportsComponent', () => {
  let component: BinreportsComponent;
  let fixture: ComponentFixture<BinreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
