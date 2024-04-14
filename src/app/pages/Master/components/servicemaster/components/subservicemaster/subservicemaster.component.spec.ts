import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubservicemasterComponent } from './subservicemaster.component';

describe('SubservicemasterComponent', () => {
  let component: SubservicemasterComponent;
  let fixture: ComponentFixture<SubservicemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubservicemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubservicemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
