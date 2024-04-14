import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisclabreportfgprintpopupComponent } from './misclabreportfgprintpopup.component';

describe('MisclabreportfgprintpopupComponent', () => {
  let component: MisclabreportfgprintpopupComponent;
  let fixture: ComponentFixture<MisclabreportfgprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisclabreportfgprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisclabreportfgprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
