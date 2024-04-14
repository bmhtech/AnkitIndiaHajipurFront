import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputItemPopupComponent } from './output-item-popup.component';

describe('OutputItemPopupComponent', () => {
  let component: OutputItemPopupComponent;
  let fixture: ComponentFixture<OutputItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
