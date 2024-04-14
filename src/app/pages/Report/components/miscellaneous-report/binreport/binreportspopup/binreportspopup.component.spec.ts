import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinreportspopupComponent } from './binreportspopup.component';

describe('BinreportspopupComponent', () => {
  let component: BinreportspopupComponent;
  let fixture: ComponentFixture<BinreportspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinreportspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinreportspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
