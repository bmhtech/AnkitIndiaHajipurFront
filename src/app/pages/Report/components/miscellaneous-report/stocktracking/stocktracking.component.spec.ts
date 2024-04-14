import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktrackingComponent } from './stocktracking.component';

describe('StocktrackingComponent', () => {
  let component: StocktrackingComponent;
  let fixture: ComponentFixture<StocktrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocktrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
