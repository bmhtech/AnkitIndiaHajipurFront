import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelChallanLoadingAdvPopUpComponent } from './del-challan-loading-adv-pop-up.component';

describe('DelChallanLoadingAdvPopUpComponent', () => {
  let component: DelChallanLoadingAdvPopUpComponent;
  let fixture: ComponentFixture<DelChallanLoadingAdvPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelChallanLoadingAdvPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelChallanLoadingAdvPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
