import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnReturnPopupComponent } from './grn-return-popup.component';

describe('GrnReturnPopupComponent', () => {
  let component: GrnReturnPopupComponent;
  let fixture: ComponentFixture<GrnReturnPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnReturnPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnReturnPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
