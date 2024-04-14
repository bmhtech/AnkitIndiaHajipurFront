import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingroupComponent } from './bingroup.component';

describe('BingroupComponent', () => {
  let component: BingroupComponent;
  let fixture: ComponentFixture<BingroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
