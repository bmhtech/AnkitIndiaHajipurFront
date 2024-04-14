import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodssubtypemasterComponent } from './nongoodssubtypemaster.component';

describe('NongoodssubtypemasterComponent', () => {
  let component: NongoodssubtypemasterComponent;
  let fixture: ComponentFixture<NongoodssubtypemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodssubtypemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodssubtypemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
