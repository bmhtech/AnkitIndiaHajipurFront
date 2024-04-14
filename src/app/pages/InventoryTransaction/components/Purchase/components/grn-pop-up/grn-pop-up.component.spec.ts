import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnPopUpComponent } from './grn-pop-up.component';

describe('GrnPopUpComponent', () => {
  let component: GrnPopUpComponent;
  let fixture: ComponentFixture<GrnPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
