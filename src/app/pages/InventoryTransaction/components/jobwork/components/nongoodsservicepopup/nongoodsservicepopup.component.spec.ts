import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodsservicepopupComponent } from './nongoodsservicepopup.component';

describe('NongoodsservicepopupComponent', () => {
  let component: NongoodsservicepopupComponent;
  let fixture: ComponentFixture<NongoodsservicepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodsservicepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodsservicepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
