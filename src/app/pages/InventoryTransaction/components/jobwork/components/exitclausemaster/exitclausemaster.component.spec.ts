import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitclausemasterComponent } from './exitclausemaster.component';

describe('ExitclausemasterComponent', () => {
  let component: ExitclausemasterComponent;
  let fixture: ComponentFixture<ExitclausemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitclausemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitclausemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
