import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodsserviceComponent } from './nongoodsservice.component';

describe('NongoodsserviceComponent', () => {
  let component: NongoodsserviceComponent;
  let fixture: ComponentFixture<NongoodsserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodsserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodsserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
