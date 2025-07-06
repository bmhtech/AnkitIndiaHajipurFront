import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FumigationStkOpnDateComponent } from './fumigation-stk-opn-date.component';

describe('FumigationStkOpnDateComponent', () => {
  let component: FumigationStkOpnDateComponent;
  let fixture: ComponentFixture<FumigationStkOpnDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FumigationStkOpnDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FumigationStkOpnDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
