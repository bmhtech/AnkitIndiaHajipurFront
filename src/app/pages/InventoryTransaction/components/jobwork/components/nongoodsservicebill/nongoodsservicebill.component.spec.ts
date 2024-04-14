import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodsservicebillComponent } from './nongoodsservicebill.component';

describe('NongoodsservicebillComponent', () => {
  let component: NongoodsservicebillComponent;
  let fixture: ComponentFixture<NongoodsservicebillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodsservicebillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodsservicebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
