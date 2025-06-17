import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFumiOpenDatePopUpComponent } from './update-fumi-open-date-pop-up.component';

describe('UpdateFumiOpenDatePopUpComponent', () => {
  let component: UpdateFumiOpenDatePopUpComponent;
  let fixture: ComponentFixture<UpdateFumiOpenDatePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFumiOpenDatePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFumiOpenDatePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
