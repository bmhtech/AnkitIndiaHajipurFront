import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodssrnComponent } from './nongoodssrn.component';

describe('NongoodssrnComponent', () => {
  let component: NongoodssrnComponent;
  let fixture: ComponentFixture<NongoodssrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodssrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodssrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
