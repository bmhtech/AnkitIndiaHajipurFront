import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongoodstypemasterComponent } from './nongoodstypemaster.component';

describe('NongoodstypemasterComponent', () => {
  let component: NongoodstypemasterComponent;
  let fixture: ComponentFixture<NongoodstypemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongoodstypemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongoodstypemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
