import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisclabreportfgComponent } from './misclabreportfg.component';

describe('MisclabreportfgComponent', () => {
  let component: MisclabreportfgComponent;
  let fixture: ComponentFixture<MisclabreportfgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisclabreportfgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisclabreportfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
