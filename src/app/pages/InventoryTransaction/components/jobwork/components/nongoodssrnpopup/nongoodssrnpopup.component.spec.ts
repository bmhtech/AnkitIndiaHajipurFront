import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodssrnpopupComponent } from './nongoodssrnpopup.component';

describe('NongoodssrnpopupComponent', () => {
  let component: NongoodssrnpopupComponent;
  let fixture: ComponentFixture<NongoodssrnpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodssrnpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodssrnpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
