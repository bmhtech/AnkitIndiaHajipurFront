import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatacceptancereportComponent } from './wheatacceptancereport.component';

describe('WheatacceptancereportComponent', () => {
  let component: WheatacceptancereportComponent;
  let fixture: ComponentFixture<WheatacceptancereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatacceptancereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatacceptancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
