import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherItemMasterComponent } from './other-item-master.component';

describe('OtherItemMasterComponent', () => {
  let component: OtherItemMasterComponent;
  let fixture: ComponentFixture<OtherItemMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherItemMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
